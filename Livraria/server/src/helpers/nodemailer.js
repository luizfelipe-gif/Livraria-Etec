import nodemailer from "nodemailer";
import fs from "fs";

function sendEmail(newPassword, userEmail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "luizf.892002@gmail.com",
            pass: "iwhm ltbe lewv cyhr "
        }
    });

    let mailOptions = {
        from: 'luizf.892002@gmail.com',
        to: userEmail,
        subject: 'Recuperação de Senha',
        html: getEmailTemplate(newPassword)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail: ', error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}

const getEmailTemplate = (newPassword) => {
    const htmlTemplate = fs.readFileSync("./src/templates/changePassword.html", 'utf-8');
    return htmlTemplate.replace('{{newPassword}}', newPassword);
};

export {sendEmail};