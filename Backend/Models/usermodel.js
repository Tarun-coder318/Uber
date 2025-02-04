const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
        type: String,
        required: true,
        minlength: [3,'Name must be at least 3 characters'],
    },
    lastname:{
        type:String,
        minlength: [3,'Name must be at least 3 characters'],
    }
},
email : {
    type :String,
    required: true,
    minlength : [5,'Email must be at least 5 characters'],
},
passward: {
    type: String,
    required: true,
    select: false,
},
soketId: {
    type: String,
},
})

userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
return token;
}

userSchema.methods.comparepassward = async function (passward){
    return await bcrypt.compare(passward, this.passward);
}

userSchema.statics.hashPassward = async function(passward){
    return await bcrypt.hash(passward, 10);
}

const userModel = mongoose.model('User', userSchema);
 module.exports = userModel;