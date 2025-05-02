const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
   
    fullname: {
        firstname: {
        type: String,
        required: true,
        minlength: [3,'Name must be at least 3 characters'],
    },
    lastname:{
        type:String,
        minlength: [3,'Name must be at least 3 characters'],
    },
},
email : {
    type :String,
    required: true,
    minlength : [5,'Email must be atleast 5 characters'],
    unique: true,
    lowercase: true,
},
password: {
    type: String,
    required: true,
    select: false,
},
socketId:{
    type: String,
},
status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
},

vehicle: {
    color: {
        type: String,
        required: true,
    },
   
    plateNumber: {
        type: String,
        required: true,
    },
   
},

location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
  
  
})
captainSchema.index({ location: '2dsphere' }, { sparse: true });



captainSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);
    module.exports=captainModel;