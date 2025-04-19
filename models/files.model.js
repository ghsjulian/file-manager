
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    author : {
        type: String,
        required: true,
        unique: true 
    },
    files: {
        type: [String], 
        default: [] 
    }
},{timestamps:true});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;