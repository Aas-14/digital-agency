require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"public","index.html")
    );
});


// EMAIL SETUP

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});


transporter.verify((error)=>{
 if(error){
    console.log(error);
 }
 else{
    console.log("Mail Server Ready ✅");
 }
});


app.post("/contact", async(req,res)=>{

const {name,email,message}=req.body;


try{

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:process.env.EMAIL_USER,

subject:"New Website Lead - Just Media 05",

html:`

<h2>New Contact Form</h2>

<p>Name:${name}</p>

<p>Email:${email}</p>

<p>Message:${message}</p>

`

});


res.json({
success:true,
message:"Email sent"
});


}

catch(err){

console.log(err);

res.status(500).json({
success:false
});

}

});


const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(
`Server running on ${PORT} 🚀`
);
});