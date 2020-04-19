const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-aman:"+process.env.PASS+"@project1-lhz8u.mongodb.net/BansalUserDB", { useNewUrlParser: true,  useUnifiedTopology: true  });

 const facultySchema = mongoose.Schema({
     image: String
 });

 const fimg = mongoose.model("Fimage", facultySchema);

 module.exports = fimg;
