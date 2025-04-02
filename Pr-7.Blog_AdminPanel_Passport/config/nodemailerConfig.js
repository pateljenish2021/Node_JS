const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "6846jenishpatel@gmail.com",
        pass: "mwziowzwevvxremi" 
    }
});

module.exports = transporter;