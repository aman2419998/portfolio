require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const assert = require("assert");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer");
const studentimg = require("./Schemas/studentSchema");
const facultyimg = require("./Schemas/facultySchema");
const authorityimg = require("./Schemas/authoritySchema");
const participantimg = require("./Schemas/participantSchema");
const User = require("./Schemas/userSchema");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

app.get("/", (req,res) => {
    res.render("homepage");
});



app.get("/student", (req,res) => {
    studentimg.find({}, (err,data) => {
        if(!err){
            res.render("photoalbum", {heading:"Student's Section",log:"/studentuploads/", logs:data});
        }else{
            console.log(err);
        }
    });
    
});

app.get("/faculty", (req,res) => {
    facultyimg.find({}, (err,data) => {
        if(!err){
            res.render("photoalbum", {heading:"Faculty's Section",log:"/facultyuploads/", logs:data});
        }else{
            console.log(err);
        }
    });
});

app.get("/authority", (req,res) => {
    authorityimg.find({}, (err,data) => {
        if(!err){
            res.render("photoalbum", {heading:"Authority's Section",log:"/authorityuploads/", logs:data});
        }else{
            console.log(err);
        }
    });
});

app.get("/participants", (req,res) => {
    participantimg.find({}, (err,data) => {
        if(!err){
            res.render("photoalbum", {heading:"Participant's Section",log:"/participantuploads/", logs:data});
        }else{
            console.log(err);
        }
    });
});

app.get("/upload" ,(req,res) => {
    if(req.isAuthenticated()){
        res.render("upload", {message: ""});
    }
    else{
        res.render("login");
    }
});

app.get("/login", (req,res) => {
    res.render("login");
})

app.post("/login", (req,res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(newUser, (err) => {
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req,res, () => {
                res.redirect("/upload");
            });
        }
    });
});

app.post("/action", (req,res) => {

    if(req.body.section === "student"){
        res.render("Proceedupload", {sec: "Student"});
    }else if(req.body.section === "faculty"){
        res.render("Proceedupload", {sec: "Faculty"});
    }else if(req.body.section === "authority"){
        res.render("Proceedupload", {sec: "Authority"});
    }else{
        res.render("Proceedupload", {sec: "Participant"});
    }
});

app.post("/studentaction", (req,res) => {
    var storage = multer.diskStorage({
            destination: "./public/studentuploads/",
            filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
            }
        });
    
        var upload = multer({ storage: storage }).array("img", 10);
    
        upload(req, res, (err) => {
            assert.equal(null,err);
            for(let i=0; i<req.files.length; i++){
                const newImage = new studentimg({
                    image: req.files[i].filename
                });
                newImage.save();
            }
            res.render("upload", {message: "Successfully Uploaded!"});
        });
});

app.post("/facultyaction", (req,res) => {
    var storage = multer.diskStorage({
            destination: "./public/facultyuploads/",
            filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
            }
        });
    
        var upload = multer({ storage: storage }).array("img", 10);
    
        upload(req, res, (err) => {
            assert.equal(null,err);
            for(let i=0; i<req.files.length; i++){
                const newImage = new facultyimg({
                    image: req.files[i].filename
                });
                newImage.save();
            }
            head="success";
            res.render("upload", {message: "Successfully Uploaded!"});
        });
});

app.post("/authorityaction", (req,res) => {
    var storage = multer.diskStorage({
            destination: "./public/authorityuploads/",
            filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
            }
        });
    
        var upload = multer({ storage: storage }).array("img", 10);
    
        upload(req, res, (err) => {
            assert.equal(null,err);
            for(let i=0; i<req.files.length; i++){
                const newImage = new authorityimg({
                    image: req.files[i].filename
                });
                newImage.save();
            }
            head="success";
            res.render("upload", {message: "Successfully Uploaded!"});
        });
});

app.post("/participantaction", (req,res) => {
    var storage = multer.diskStorage({
            destination: "./public/participantuploads/",
            filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
            }
        });
    
        var upload = multer({ storage: storage }).array("img", 10);
    
        upload(req, res, (err) => {
            assert.equal(null,err);
            for(let i=0; i<req.files.length; i++){
                const newImage = new participantimg({
                    image: req.files[i].filename
                });
                newImage.save();
            }
            res.render("upload", {message: "Successfully Uploaded!"});
        });
});


app.listen(process.env.PORT || 3000,() => {
    console.log("server running at port : 3000");
});