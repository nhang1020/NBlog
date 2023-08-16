require('dotenv').config();
const nodemailer = require('nodemailer')
const db = require('../models/index.js');
let sendSampleEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <nhangnhanh1234@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Đăng ký tài khoản tại NBlog", // Subject line
        html: `
            <h2>Xin chào ${data.firstName} ${data.lastName}</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại NBlog. Để tiếp tục vui lòng nhập mã ở dưới để hoàn thành đăng ký tài khoản.</p>
            <h3>Code: ${data.otp}</h3>
            <i>non@Copy</i>
        `, // html body
    });
}
let sendEmail = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            await sendSampleEmail(data);
            resolve({
                errCode: 0,
                message: 'Send email succeed!'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let checkExistsEmailService = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } });
            if (user) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exists. Please try another email!'
                })
            } else {
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    sendSampleEmail,
    sendEmail,
    checkExistsEmailService
}