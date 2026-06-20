require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// const mysql = require("mysql2"); ❌ COMMENTED (DB disabled)

const app = express();

app.use(cors());
app.use(express.json());

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Mail Error:", error);
  } else {
    console.log("Mail Server Ready ✅");
  }
});

// /* COMMENTED DATABASE CONNECTION
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.log("MySQL Error:", err);
//   } else {
//     console.log("MySQL Connected ✅");
//   }
// });
// */

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

//   /* ❌ COMMENTED DATABASE INSERT
//   const sql =
//     "INSERT INTO contacts (name,email,message) VALUES (?,?,?)";

//   db.query(sql, [name, email, message], async (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Database Error",
//       });
//     }
//   */
  
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Website Lead - Just Media 05",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      console.log("Email Sent:", info.response);

      return res.status(200).json({
        success: true,
        message: "Email sent successfully ✅",
      });
    } catch (error) {
      console.log("Email Error:", error);

      return res.status(500).json({
        success: false,
        message: "Email failed ❌",
      });
    }

//   /* ❌ COMMENTED DATABASE CALLBACK END
//   });
//   */
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});





// require('dotenv').config();
// // console.log("EMAIL_USER =", process.env.EMAIL_USER);
// // console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

// //Email notification

// // const nodemailer = require("nodemailer");
// // const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS
// //     }
// // });

// // transporter.verify(function(error, success) {
// //     if (error) {
// //         console.log("Mail Error:", error);
// //     } else {
// //         console.log("Mail Server Ready ✅");
// //     }
// // });


// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err)=>{
//     if(err){
//         console.log('MySQL Error:', err);
//     }else{
//         console.log('MySQL Connected ✅');
//     }
// });
// app.post("/contact", (req, res) => {

//     const { name, email, message } = req.body;

//     const sql =
//     "INSERT INTO contacts (name,email,message) VALUES (?,?,?)";

//     db.query(sql, [name, email, message], async (err, result) => {

//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     success:false,
//                     message:"Database Error"
//                 });
//             }

//             // EMAIL CODE GOES HERE 👇
// try {

//     const info = await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: process.env.EMAIL_USER,
//         subject: "New Website Lead - Just Media 05",
//         html: `
//             <h2>New Contact Form Submission</h2>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Message:</strong> ${message}</p>
//         `
//     });

//     console.log("Email Sent:", info.response);

// } catch(error) {

//     console.log("Email Error:", error);

// }
//             return res.status(200).json({
//                 success:true,
//                 message:"Message Saved Successfully ✅"
//             });
//         }
//     );
// });

// const PORT =
// process.env.PORT || 3000;

// app.listen(PORT,()=>{
//     console.log(
//         `Server running on ${PORT} 🚀`
//     );
// });