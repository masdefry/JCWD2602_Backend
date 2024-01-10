import nodemailer from 'nodemailer';

export const transporterNodemailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'masdefry20@gmail.com', // Email Sender
        pass: 'jvsrafqdlisezrpf' // Key Generate
    },
    tls: {
        rejectUnauthorized: false
    }
})
