const Auth = require("../auth/auth.config");

const isLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token === "") throw new Error("No token provided");
        const user = await Auth(token);
        if (user === null) throw new Error("Unauthorized User");
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({
            code: 403,
            status: false,
            message: error.message || "Unauthorized Access !"
        });
    }
};

module.exports = isLogin;
