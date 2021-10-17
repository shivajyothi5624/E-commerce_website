const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    maxlength:32,
  },
  lname:{
    type:String,
    trim:true,
    maxlength:32
  },
  email:{
    required:true,
    type:String,
    trim:true,
    unique:true
  },
  salt:String,
  role:{
    type:Number,
    default:0
  },
  purchase:{
    type:Array,
    default:[]

  },
  userInfo:{
    type:String,
    trim:true
  },
  ency_password:{
    type:String,
  }
},
{ timestamps: true }
);

UserSchema.virtual("password")
.set(function(password){
  this._password = password;
  this.salt = uuidv4();
  this.ency_password = this.securepassword(password);
  console.log(this.ency_password);
})
.get(function(){
  return this._password;
})


UserSchema.methods = {
  authenticate: function(plainpassword){
    return this.securepassword(plainpassword) === this.ency_password;
    
  },
  securepassword: function(plainpassword){
   
    if(!plainpassword) return"";
    try{
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
      
    }
    catch(err)
    {
      return "";
    }
    
  }
}



module.exports = mongoose.model("User",UserSchema);