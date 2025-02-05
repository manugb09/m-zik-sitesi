const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',  // Giriş yapacağınız e-posta
        pass: 'your-email-password'    // E-posta şifreniz
    }
});

// E-posta gönderme API'si
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Sunucuyu başlat
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
