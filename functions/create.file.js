const path = require("path");
const fs = require("fs");

const createNewFile = filename => {
    if (filename) {
        try {
            fs.writeFileSync(filename, "");
            console.log("File created successfully!");
            return true
        } catch (err) {
            console.error(err);
            return false;
        }
    } else {
        return false;
    }
};

module.exports = createNewFile