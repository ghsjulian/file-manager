
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    files: {
        type: [String], 
        default: [] 
    }
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;