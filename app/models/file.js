const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const FileSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    filename: { type: String, required: true },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    }
});


const File = (module.exports = mongoose.model("File", FileSchema));