var express = require('express')
const { check, validationResult } = require('express-validator');
var router = express.Router()
const {signout,signup,signin,isSignIn} = require("../controllers/auth");


router.post('/signin',[
  check('password').isLength({ min: 3 }).withMessage('password must be at least 3 chars long'),
  check('email').isEmail().withMessage("email is required")
],signin);


router.get('/signout',signout);
router.post('/signup',[
  check('password').isLength({ min: 3 }).withMessage('password must be at least 3 chars long'),
  check('name').isLength({ min: 3 }).withMessage('name must be at least 3 chars long')
],signup);


router.get("/test",isSignIn,(req,res)=>{
  res.send("protected")
})

module.exports = router;
