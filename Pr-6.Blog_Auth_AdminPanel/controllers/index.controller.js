const Admin = require("../models/admin.model");
const transporter = require("../config/nodemailerConfig");

exports.getLogin = (req, res) => {
    if (req.cookies.adminAuth) {
        return res.redirect("/dashboard");
    }
    res.render("AuthPages/login");
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.send("Invalid email or password");
        }

        if (admin.password !== password) { 
            return res.send("Invalid email or password");
        }

        res.cookie("adminAuth", admin._id, { httpOnly: true });
        res.redirect("/dashboard");

    } catch (error) {
        res.send("Error logging in");
    }
};

exports.getDashboard = (req, res) => {
    if (!req.cookies.adminAuth) {
        return res.redirect("/login");
    }
    res.render("dashboard");
};

exports.logout = (req, res) => {
    res.clearCookie("adminAuth");
    res.redirect("/login");
};

exports.getForgotPasswordPage = (req, res) => {
    res.render("AuthPages/forgotpass");
};

exports.postForgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.send("Email not found!");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        res.cookie("otp", otp);
        res.cookie("resetEmail", email);

        const mailOptions = {
            from: "6846jenishpatel@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting the password is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.redirect("/otp");
    } catch (error) {
        res.send("Error sending OTP.");
    }
};

exports.getOtpPage = (req, res) => {
    res.render("AuthPages/otp");
};

exports.postOtpVerification = (req, res) => {
    const { otp } = req.body;

    if (req.cookies.otp == otp) {
        res.clearCookie("otp");
        res.redirect(`/newpass?email=${req.cookies.resetEmail}`); 
    } else {
        res.send("Invalid OTP!");
    }
};

exports.getNewPasswordPage = (req, res) => {
    const email = req.query.email || req.cookies.resetEmail; 
    if (!email) {
        return res.send("Session expired! Try again.");
    }
    res.render("AuthPages/newpass", { email });
};

exports.postNewPassword = async (req, res) => {
    const { password } = req.body;
    const email = req.cookies.resetEmail;

    if (!email) {
        return res.send("Session expired! Try again.");
    }

    try {
        await Admin.findOneAndUpdate({ email }, { password }); 
        res.clearCookie("resetEmail");
        res.redirect("/login");
    } catch (error) {
        res.send("Error resetting password.");
    }
};
