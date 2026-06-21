require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { Resend } = require("resend");


const app = express();


const resend = new Resend(
    process.env.RESEND_API_KEY
);



app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.static("public"));



app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"public","index.html")
    );

});



app.get("/test",(req,res)=>{

    res.send("Backend working ✅");

});




app.post("/contact", async(req,res)=>{


const {
    name,
    email,
    message

}=req.body;



try{


await resend.emails.send({

from: "onboarding@resend.dev",

to: process.env.EMAIL_USER,

subject:"New Website Lead - Just Media 05",


html:`

<h2>New Contact Form Submission</h2>

<p><b>Name:</b> ${name}</p>

<p><b>Email:</b> ${email}</p>

<p><b>Message:</b> ${message}</p>


`

});



res.json({

success:true,

message:"Email sent"

});



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Email failed"

});


}



});





const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{

console.log(
`Server running on ${PORT}`
);

});