const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session= require("express-session");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const passportlocalmongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findOrCreate")

const app = express();

app.set('view engine', 'html');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname))
mongoose.connect("mongodb://localhost:27017/loginDB");

const signupSchema={
  fname:String,
  email: String,
  password: String,
  cpassword: String,
  mno: Number
};

const signup = mongoose.model("login",signupSchema);

const loginSchema ={
  email: String,
  password: String
};

const login = mongoose.model("user",loginSchema);


app.get("/",function(req,res){
  res.sendFile(__dirname+"/login-signup.html");
});

app.post("/signup",function(req,res){
  const fname = req.body.signup_fname;
  const ema = req.body.signup_email;
  const pass = req.body.signup_pass;
  const cpass = req.body.signup_cpass;
  const mno = req.body.signup_mno;
  const newitem  = new signup({
    fname: fname,
    email: ema,
    password:pass,
    cpassword: cpass,
    mno: mno
  });
  newitem.save();
  res.sendFile(__dirname+"/login-signup.html");
});

app.post("/login",function(req,res){
  const username = req.body.login_email;
  const password =req.body.login_password;
  signup.findOne({email:username},function(err,found){
    if(err){
      console.log(err);
    }
    else{
      if(found){
        if(found.password===password){
            res.sendFile(__dirname+"/home.html");
        }
      }
    }
  })
})



app.listen(3000,function(){
  console.log("server active");
});
