const UserModel = require("../models/user.model");
const { decodeJWT } = require("../tools/jwt.config");

const Auth = async token => {
    try {
        if (!token) throw new Error("No token");
        const data = await decodeJWT(token);
        if (data !== null) {
            const user = await UserModel.findOne({ _id: data?.id }).select(
                "-password"
            );
            return user
        } else {
            throw new Error("Unauthorized User");
        }
    } catch (error) {
        return null;
    }
};

module.exports = Auth;
