const User = require("../models/user");
const { validationResult } = require('express-validator');
const user = require("../models/user");
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


exports.signout = (req,res)=>{
  res.clearCookie("token");
  res.send("user loggedout");
};

exports.signin = (req,res)=>{
  // console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array()[0].msg });
  }
  const {email,password} = req.body;
  user.findOne({email}, (err,user)=>{
    if(err || !user){
      return res.status(400).json({
        error:"email doesn't exist"
      });
    }
      
      if(!user.authenticate(password)){
         return res.status(401).json({
           error:"Email and password doesn't match"
        })
      }

      //create token
      var token = jwt.sign({_id:user._id },process.env.SECRET);

      // put token
      res.cookie("token",token,{expire:new Date()+9999})
      // send responce to front end
      const {_id,name,email,role} = user;
      return res.json({token,user: {_id,name,email,role}});
  });
};

exports.signup = (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }
  const user2 = new user(req.body);
  user2.save((err,user2)=>{
      if(err){
        console.log(err)
        return res.status(400).send("data has not been saved");
      }
      else{
       return res.status(200).json({
         signedup:"successfully signedup"
       })
      }
  })
}

// protecting router
exports.isSignIn = expressJwt({
  secret:process.env.SECRET,
  userProperty:"auth"
})

// custom middlever
exports.isAdmin= (req,res,next)=>{
  if(req.profile.role === 0)
  {
    res.status(403).send("yor are not ADMIN, ACCESS debied")
  }
  next()
}

exports.isAuthenicated = (req,res,next)=>{
  if(!(req.profile && req.auth && req.profile._id == req.auth._id)){
    res.status(403).send("ACCESS denied");
  }
  next()
}
