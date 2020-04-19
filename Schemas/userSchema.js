const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://admin-aman:"+process.env.PASS+"@project1-lhz8u.mongodb.net/BansalUserDB", { useNewUrlParser: true,  useUnifiedTopology: true  });

 const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

 const User = mongoose.model("User", userSchema);

 module.exports = User;
