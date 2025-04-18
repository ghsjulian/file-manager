require("dotenv").config("../.env");
const path = require("path");
const fileModel = require("../models/files.model");
const rename = require("../functions/rename.file");

class FilesController {
    async uploadFiles(req, res) {
        const files = req.files["files"] || [];
        const fileList = [];
        const api = process.env.API;

        if (files.length > 0) {
            files.forEach(file => {
                fileList.push(`${api}/uploads/${file.filename}`);
            });
        } else {
            fileList.push(`${api}/uploads/${files[0].filename}`);
        }
        try {
            var fileDocument = await fileModel.findOne({ id: req.user._id });
            if (fileDocument) {
                fileDocument.files.push(...fileList);
                await fileDocument.save();
            } else {
                fileDocument = await new fileModel({
                    id: req.user._id,
                    files: fileList
                });
                await fileDocument.save();
            }
            return res.status(200).json({
                success: true,
                message: "File Uploaded Successfully"
            });
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
    async getFiles(req, res) {
        const id = req.user._id;
        try {
            const files = await fileModel.findOne({ id: id });
            if (files) {
                return res.status(200).json({
                    files,
                    success: true
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "No File Found In This Server !"
                });
            }
        } catch (error) {
            return res.status(505).json({
                success: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
    async renameFile(req, res) {
        const id = req.user._id;
        const api = process.env.API;
        const { filename, newname } = req.body;
        const changedName = `${api}/uploads/${newname}`;

        try {
            var userFiles = await fileModel.findOne({ id: id });
            if (userFiles) {
                if (await rename(filename, newname)) {
                    const result = await fileModel.updateOne(
                        { id: id, files: filename }, // Find the document with the specific id and the filename to update
                        { $set: { "files.$": changedName } } // Update the matched filename to changedName
                    );
                    return res.status(200).json({
                        success: true,
                        message: "File Renamed Successfully!",
                        newname: changedName
                    });
                } else {
                    return res.status(404).json({
                    success: false,
                    message: "No File Exist In The Server !"
                });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "No File Found In This Server !"
                });
            }
        } catch (error) {
            return res.status(505).json({
                success: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
}

module.exports = new FilesController();

/*
// Original array
let array = ["ghs", "ghhh", "hjjh"];

// Element to find and the new element to replace it with
let elementToFind = "ghhh";
let newElement = "newValue";

// Use map to create a new array with the replaced element
let updatedArray = array.map(item => {
    return item === elementToFind ? newElement : item;
});

// Output the updated array
console.log(updatedArray);
*/
