const nodemailer = require("nodemailer");


async function sendVerificationEmail(to, subject, body){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS

        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: body
    };
    await transporter.sendMail(mailOptions);
    
}    
module.exports = sendVerificationEmail; 