const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-aman:"+process.env.PASS+"@project1-lhz8u.mongodb.net/BansalUserDB", { useNewUrlParser: true,  useUnifiedTopology: true  });

 const participantSchema = mongoose.Schema({
     image: String
 });

 const pimg = mongoose.model("Pimage", participantSchema);

 module.exports = pimg;
