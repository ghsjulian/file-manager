require("dotenv").config("../.env");
const path = require("path");
const fs = require("fs");

const rename = async (currentName, newName) => {
    let folder = path.join(__dirname, "../uploads/");
    let parts = currentName.split("/");
    let partsName = folder + parts[parts.length - 1];
    try {
        if (await fs.existsSync(partsName)) {
            await fs.renameSync(partsName, folder + newName);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = rename;
