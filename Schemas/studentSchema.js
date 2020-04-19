const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-aman:"+process.env.PASS+"@project1-lhz8u.mongodb.net/BansalUserDB", { useNewUrlParser: true,  useUnifiedTopology: true  });

 const studentSchema = mongoose.Schema({
     image: String
 });

 const simg = mongoose.model("Simage", studentSchema);

 module.exports = simg;
