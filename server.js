require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"public","index.html")
    );
});


// EMAIL SETUP

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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




app.get("/test", (req,res)=>{
    res.send("Backend working ✅");
});

app.post("/contact", async(req,res)=>{

const {name,email,message}=req.body;


try{

await resend.emails.send({

from: "onboarding@resend.dev",

to: process.env.EMAIL_USER,

subject: "New Website Lead - Just Media 05",

html: `
<h2>New Contact Form Submission</h2>

<p>Name: ${name}</p>

<p>Email: ${email}</p>

<p>Message: ${message}</p>
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
`Server running on ${PORT}`
);
});