const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-aman:"+process.env.PASS+"@project1-lhz8u.mongodb.net/BansalUserDB", { useNewUrlParser: true,  useUnifiedTopology: true  });

 const authoritySchema = mongoose.Schema({
     image: String
 });

 const aimg = mongoose.model("Aimage", authoritySchema);

 module.exports = aimg;
