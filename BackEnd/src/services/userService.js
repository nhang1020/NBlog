const db = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

var salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resovle, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resovle(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}


let createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exists. Please try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let response =
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        birth: data.birth,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        role: data.role,
                        avatar: data.avatar,
                        status: data.status
                    },)
                let resUser = await db.User.findOne({ where: { id: response.id }, nest: true })
                resolve({
                    errCode: 0,
                    message: 'OK',
                    user: resUser
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getUsersSevice = async (option) => {
    let limit = option.limit;
    return new Promise(async (resolve, reject) => {
        try {
            let users = null;
            if (limit === 'All' || !limit || limit === 'all' || isNaN(limit)) {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            } else {
                users = await db.User.findAll({
                    offset: option.offset ? option.offset : 0,
                    limit: +limit,
                    where: option.userId ? { id: { [Op.ne]: option.userId } } : {},
                    attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'],
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            }
            resolve({
                data: users,
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId }, raw: false });
            await db.Comment.destroy({ where: { userId: user.id } });
            await db.Like.destroy({ where: { userId: user.id } });
            await db.Relationship.destroy({
                where: {
                    [Op.or]: [
                        { performerId: user.id },
                        { receiverId: user.id },
                    ],
                }
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    message: `The user doesn't exists.`
                })
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: 'Delete user is succeed!',
                    userId
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getUserDetailService = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                include: [
                    { model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                user: user ? user : {},
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}
let editUserService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({ where: { id: data.id }, raw: false });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phoneNumber = data.phoneNumber;
                user.address = data.address;
                user.gender = data.gender;
                user.facebook = data.facebook;
                user.youtube = data.youtube;
                user.twitter = data.twitter;
                data.birth ? user.birth = data.birth : '',
                    user.profile = data.profile;
                if (data.avatar) {
                    user.avatar = data.avatar;
                }
                await user.save();
                let resUser = await db.User.findOne({ where: { id: data.id } });
                resolve({
                    user: resUser,
                    errCode: 0,
                    message: 'Update user is success.'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User is not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let followExists = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let relate = await db.Relationship.findOne({ where: { performerId: data.performerId, receiverId: data.receiverId } });
            if (relate) {
                resolve({
                    check: true,
                    idRelate: relate.id
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
let followUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.performerId || !data.receiverId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameters"
                })
            }
            let res = await followExists(data);
            let response = {};
            if (res.check) {
                await db.Relationship.destroy({ where: { performerId: data.performerId, receiverId: data.receiverId } })
                response = res.idRelate;
            }
            else {
                response = await db.Relationship.create({
                    performerId: data.performerId,
                    receiverId: data.receiverId,
                    action: 'follow'
                })
            }

            resolve({
                errCode: 0,
                message: 'OK',
                relate: response,
                check: res.check
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let getFollowsService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let follows = await db.Relationship.findAll();
            resolve({
                data: follows,
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createUserService,
    getUsersSevice,
    deleteUserService,
    getUserDetailService,
    editUserService,
    followUserService,
    getFollowsService
}