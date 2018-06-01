const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const UserSchema = new Schema({
    fullname: { type: String, lowercase: true, required: true },
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    is_active: { type: Boolean, required: true, default: false },
    temporarytoken: { type: String, required: true },
    created_at: { type: Date, required: true }
});



UserSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

// UserSchema.pre('save',function(next){
//   var user = this;
//   bcrypt.hash(user.password,null,null,function(err,hash){
//     if(err) return next(err);
//     user.password = hash;
//     next();
//   })

// })

const User = module.exports = mongoose.model('User', UserSchema);