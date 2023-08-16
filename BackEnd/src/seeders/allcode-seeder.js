'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('AllCodes', [
            {
                keyMap: "R0",
                type: "Role",
                valueEn: "Admin",
                valueVi: "Quản trị viên",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "R1",
                type: "Role",
                valueEn: "User",
                valueVi: "Người dùng",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "M",
                type: "Gender",
                valueEn: "Male",
                valueVi: "Nam",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "F",
                type: "Gender",
                valueEn: "Female",
                valueVi: "Nữ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "O",
                type: "Gender",
                valueEn: "Other",
                valueVi: "Khác",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "S0",
                type: "Status",
                valueEn: "Wait for confirmation",
                valueVi: "Chờ xác nhận",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "S1",
                type: "Status",
                valueEn: "Confirmed",
                valueVi: "Đã xác nhận",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "S2",
                type: "Status",
                valueEn: "Received",
                valueVi: "Đã nhận",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "C0",
                type: "Category",
                valueEn: "Electronic device",
                valueVi: "Đồ điện tử",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "C1",
                type: "Category",
                valueEn: "Houseware",
                valueVi: "Đồ gia dụng",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "C2",
                type: "Category",
                valueEn: "Fashion",
                valueVi: "Thời trang",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "C3",
                type: "Category",
                valueEn: "Other",
                valueVi: "Khác",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "A0",
                type: "Action",
                valueEn: "Follow",
                valueVi: "Theo dõi",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "A1",
                type: "Action",
                valueEn: "Block",
                valueVi: "Chặn",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "Q0",
                type: "Quality",
                valueEn: "New",
                valueVi: "Mới",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "Q1",
                type: "Quality",
                valueEn: "Used",
                valueVi: "Đã qua sử dụng",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "T0",
                type: "Topic",
                valueEn: "Post",
                valueVi: "Bài đăng",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "T1",
                type: "Topic",
                valueEn: "Job",
                valueVi: "Việc làm",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            //
            {
                keyMap: "P0",
                type: "Privacy",
                valueEn: "Public",
                valueVi: "Công khai",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "P1",
                type: "Privacy",
                valueEn: "Followers",
                valueVi: "Người theo dõi",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                keyMap: "P2",
                type: "Privacy",
                valueEn: "Only me",
                valueVi: "Chỉ mình tôi",
                createdAt: new Date(),
                updatedAt: new Date()
            },
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
