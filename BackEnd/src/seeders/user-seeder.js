'use strict';
import bcrypt from 'bcryptjs';

let salt = bcrypt.genSaltSync(10);
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
let password = hashUserPassword("123");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: "admin@gmail.com",
                password: password,
                firstName: "Quản trị",
                lastName: "Nhàng",
                address: "An Giang",
                phoneNumber: "0972667944",
                gender: "F",
                avatar: null,
                role: "R0",
                profile: null,
                token: null,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
