require("dotenv").config("../.env");
const path = require("path");
const fs = require("fs");

const deletefile= async (fileUrl) => {
    let folder = path.join(__dirname, "../uploads/");
    let parts = fileUrl.split("/");
    let partsName = folder + parts[parts.length - 1];
    try {
        if (await fs.existsSync(partsName)) {
            await fs.unlinkSync(partsName);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = deletefile;
