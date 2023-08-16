const db = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const _ = require('lodash')

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

let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'password', 'firstName', 'lastName', 'avatar'],
                    where: { email: email },
                })
                if (user) {
                    let getPassword = user.password ? user.password : JSON.stringify(user.password)
                    let checkPassword = bcrypt.compareSync(password, getPassword);

                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = "OK";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password is wrong!'
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email not exist';
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let handleLoginSocialService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(data.email)
            if (isExist) {
                //login
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'firstName', 'lastName', 'avatar'],
                    where: { email: data.email },
                    raw: true
                })
                if (user) {
                    userData.errCode = 0;
                    userData.message = "OK"
                    userData.user = user;
                }
            } else {
                let response =
                    await db.User.create({
                        email: data.email,
                        firstName: data.family_name,
                        lastName: data.given_name,
                        role: 'R1',
                        status: 1
                    },)
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'firstName', 'lastName', 'avatar'],
                    where: { email: response.email },
                    raw: true
                })
                if (user) {
                    userData.errCode = 0;
                    userData.message = "OK"
                    userData.user = user;
                }
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

//getAllCode
let getAllCodeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = await db.AllCode.findAll();
            resolve({
                errCode: 0,
                data: allcode,
            })

        } catch (error) {
            reject(error)
        }
    })
}


let searchDataService = (searchText) => {
    return new Promise(async (resolve, reject) => {
        try {
            let keyword = searchText.trim().replace(/\s+/g, ' ');
            const resultArray = keyword.split(' ');
            // let users = await db.sequelize.query(`SELECT id, firstName, lastName, avatar FROM users WHERE firstName LIKE '%${keyword}%' OR lastName LIKE '%${keyword}%' OR firstName in('${resultArray}') OR lastName in('${resultArray}')`, {
            //     nest: true
            // });


            let posts = await db.Post.findAll({
                order: [['createdAt', 'DESC']],
                limit: 10,
                include: [
                    // { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'], },
                ],
                where: {
                    [Op.or]: [
                        { contents: { [Op.like]: `%${keyword}%` } },
                        { '$userData.firstName$': { [Op.like]: `%${keyword}%` } },
                        { '$userData.lastName$': { [Op.like]: `%${keyword}%` } },
                    ],
                },
                raw: true,
                nest: true
            });

            const idsArray = posts.map((item) => item.id);

            let images = idsArray.length > 0 ? await db.sequelize.query(`SELECT * from PostFiles WHERE postId in (${idsArray})`, {
                nest: true
            }) : [];

            const userIdArray = posts.map((item) => item.userId);
            const usersHavePost = _.uniqBy(posts.map(item => item.userData), 'id');
            let users = await db.sequelize.query(`SELECT id, firstName, lastName, avatar, role FROM Users WHERE (firstName LIKE '%${keyword}%' OR lastName LIKE '%${keyword}%') ${userIdArray.length ? `AND id NOT IN (${userIdArray})` : ''}`, {
                nest: true
            });
            resolve({
                errCode: 0,
                users: users.concat(usersHavePost),
                posts,
                images
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCodeService,
    handleLoginService,
    handleLoginSocialService,
    searchDataService
}