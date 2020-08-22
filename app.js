const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyparser = require("body-parser");


//Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//SETTING STATIC FOLDER
app.set("view engine", "html");
// app.set("/public", express.static("/public"));


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'a9719647480@gmail.com', // generated ethereal user
        pass: '9719647480'  // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});



// let mailOptions = {
//     from: '<a9719647480@gmail.com>', // sender address
//     to: 'porwal.1@iitj.ac.in', // list of receivers
//     subject: 'Node Contact Request', // Subject line
//     text: 'Hello world from node', // plain text body
//     // html: output // html body
// };




// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     // res.render('contact', { msg: 'Email has been sent' });
// });




//END POINTS
app.get("/", (req, res) => {
    res.status(200).sendFile("views/index.html", { root: __dirname });
})

app.post("/", (req, res) => {
    let { mails, content } = req.body;
    // console.log(mails.split(","), content)
    let allMails = mails.split(",");
    console.log(content)

    let mailOptions = {
        from: '<a9719647480@gmail.com>', // sender address
        to: allMails.map(m => m), // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: content, // plain text body
        // html: `<pre>${content}</pre>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).sendFile("views/sent.html", { root: __dirname });
    });



})



app.listen(80, () => {
    console.log("Server started at port 80");
})