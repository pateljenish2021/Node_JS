const passport = require("passport");
const Admin = require("../models/admin.model");
const transporter = require("../config/nodemailerConfig");

exports.getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.render("AuthPages/login");
};

exports.postLogin = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
});

exports.getDashboard = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.render("dashboard");
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect("/login");
    });
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

// Change Password Functionality
exports.getChangePasswordPage = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.render("AuthPages/changePassword");
};

exports.postChangePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.user._id; // Assuming user session is stored

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.send("Admin not found!");
        }

        // Condition 1: Check if current password is correct
        if (admin.password !== currentPassword) {
            return res.send("Current password is incorrect!");
        }

        // Condition 2: New password should not be the same as current password
        if (currentPassword === newPassword) {
            return res.send("New password must be different from the current password!");
        }

        // Condition 3: Confirm password must match new password
        if (newPassword !== confirmPassword) {
            return res.send("New password and confirm password do not match!");
        }

        // Update password
        await Admin.findByIdAndUpdate(adminId, { password: newPassword });

        // Destroy session and redirect to login
        req.session.destroy((err) => {
            if (err) return res.send("Error logging out after password change.");
            res.redirect("/login");
        });

    } catch (error) {
        res.send("Error updating password.");
    }
};
