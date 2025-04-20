const path = require("path");
const fs = require("fs");

const createNewFolder = folderName => {
    if (folderName) {
        try {
            fs.mkdirSync(folderName, { recursive: true });
            console.log("Folder created successfully!");
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    } else {
        return false;
    }
};

module.exports = createNewFolder;
