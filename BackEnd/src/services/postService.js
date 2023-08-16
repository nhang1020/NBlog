const db = require('../models/index.js');
const { Op } = require('sequelize');

let getPostsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                order: [['createdAt', 'DESC']],
                offset: +data.offset,
                limit: +data.limit,
                where: data.userId ? { userId: data.userId } : { privacy: { [Op.ne]: 'P2' } },
                include: [
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] },
                ],
                raw: true,
                nest: true
            });
            let listPostId = posts.map(item => item.id);


            let images = !data.userId ? await db.sequelize.query(`SELECT PostFiles.*, Users.id as userId FROM PostFiles JOIN Posts ON PostFiles.postId = Posts.id JOIN Users ON Users.id = Posts.userId WHERE PostFiles.postId IN (SELECT Posts.id FROM Posts WHERE Users.id = Posts.userId) ${listPostId.length ? `AND PostFiles.postId IN (${listPostId})` : ''}`)
                :
                await db.sequelize.query(`SELECT PostFiles.*, Users.id as userId FROM PostFiles JOIN Posts ON PostFiles.postId = Posts.id JOIN Users ON Users.id = Posts.userId WHERE PostFiles.postId IN (SELECT Posts.id FROM Posts WHERE Users.id = Posts.userId AND Posts.userId = ${data.userId}) `)
                ;


            let likes = await db.Like.findAll();
            resolve({
                errCode: 0,
                data: posts,
                images: images[0],
                likes: likes,
            })
        } catch (error) {
            reject(error)
        }
    })
}

let createPostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Post.create({
                userId: data.userId,
                topic: data.topic,
                contents: data.contents,
                theme: data.theme,
                privacy: data.privacy,
            })
            let post = await db.Post.findOne({
                where: { id: response.id },
                include: [
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] },
                ],
                raw: true,
                nest: true
            });
            let images = [];
            if (data.listImage && data.listImage.length>0) {
                const list = data.listImage.map((item, index) => ({
                    postId: post.id,
                    image: item
                }))

                let listIdImages = await db.PostFile.bulkCreate(list);
                const arrayOfObjects = listIdImages.map(item => item.dataValues.id);

                let lsimages = await db.sequelize.query(`SELECT * FROM PostFiles WHERE id IN (${arrayOfObjects})`);
                images = lsimages[0].map(item => ({
                    ...item,
                    userId: data.userId,
                }));
            }

            resolve({
                errCode: 0,
                message: 'OK',
                post: post ? post : {},
                images: images,
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let deletePostService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: `Missing required parameter`
                })
            }
            let post = await db.Post.findOne({ where: { id: id }, raw: false });
            if (!post) {
                resolve({
                    errCode: 2,
                    message: `The post isn't exists.`
                })
            } else {
                await post.destroy();
                await db.PostFile.destroy({ where: { postId: id } })
                await db.Comment.destroy({ where: { postId: id } })
                resolve({
                    id: post.id,
                    errCode: 0,
                    message: 'Delete post is success.'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let commentPostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Comment.create({
                postId: data.postId,
                userId: data.userId,
                content: data.content,
                parentComment: data.parentComment ? data.parentComment : null
            })
            let comments = await db.Comment.findOne({
                where: { id: response.id },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.User, as: 'userComment', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] }
                ],
                raw: true,
                nest: true
            });

            resolve({
                errCode: 0,
                message: 'OK',
                comment: comments,
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let getCommentsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameters"
                })
            }
            let comments = await db.Comment.findAll({
                offset: 0,
                // limit: ,
                where: { postId: data.postId },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.User, as: 'userComment', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                comments: comments
            })
        } catch (error) {
            reject(error)
        }
    })
}

let likeExists = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let like = await db.Like.findOne({ where: { postId: data.postId, userId: data.userId } });
            if (like) {
                resolve({
                    check: true,
                    idComment: like.id
                });
            } else {
                resolve({
                    check: false,
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let likePostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId || !data.userId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameters"
                })
            }
            let res = await likeExists(data);
            let response = {};
            if (res.check) {
                await db.Like.destroy({ where: { postId: data.postId, userId: data.userId } })
                response = res.idComment;
            }
            else {
                response = await db.Like.create({
                    postId: data.postId,
                    userId: data.userId,
                })
            }

            resolve({
                errCode: 0,
                message: 'OK',
                like: response,
                check: res.check
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let getPostDetailService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findOne({
                where: { id },
                include: [
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] },
                ],
                raw: true,
                nest: true
            });

            if (posts) {
                let images = await db.PostFile.findAll({
                    where: { postId: posts.id }
                });

                let likes = await db.Like.findAll({
                    where: { postId: posts.id }
                });
                resolve({
                    errCode: 0,
                    data: posts,
                    images: images,
                    likes: likes,
                })
            } else {
                resolve({
                    errCode: 0,
                    data: {},
                    images: [],
                    likes: [],
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}
let editPostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({ where: { id: data.id }, raw: false });
            if (post) {
                post.contents = data.contents;
                post.privacy = data.privacy;
                await post.save();
                let resPost = await db.Post.findOne({ where: { id: data.id } });
                resolve({
                    post: resPost,
                    errCode: 0,
                    message: 'Update post is success.'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Post is not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createPostService,
    getPostsService,
    deletePostService,
    commentPostService,
    getCommentsService,
    likePostService,
    getPostDetailService,
    editPostService
}
