require("dotenv").config("../.env");

const setCookie =  (res, token, data) => {
    return res
        .cookie("tutorial", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production", // Set to true in production
            path: "/" // Ensure the path is correct
        })
        .status(200)
        .json({
            user: data,
            status: true,
            error: false,
            success: true,
            message: "User Logged In Successfully"
        });
};

module.exports = setCookie;
