require("dotenv").config("../.env");
const path = require("path");
const fileModel = require("../models/files.model");
const rename = require("../functions/rename.file");
const deletefile = require("../functions/delete.file");

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
                    author: req.user.name,
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
                    files: [],
                    message: "No File Found In This Server !"
                });
            }
        } catch (error) {
            return res.status(505).json({
                files: [],
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
    async deleteFile(req, res) {
        const { file } = req.body;
        try {
            // Call the function to delete the file from the storage
            await deletefile(file);
            // Update the database to remove the file from the user's files array
            const result = await fileModel.updateOne(
                { id: req.user._id }, // Find the document with the specific user id
                { $pull: { files: file } } // Use $pull to remove the file from the array
            );
                return res.status(200).json({ success:true,message: "File Deleted Successfully" });
        } catch (error) {
           return res.status(500).json({success:false,
                message: "An error occurred while deleting the file."
            });
        }
    }
}

module.exports = new FilesController();
