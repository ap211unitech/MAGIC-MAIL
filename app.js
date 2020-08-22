const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyparser = require("body-parser");


//Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//SETTING STATIC FOLDER
app.set("view engine", "html");



//END POINTS
app.get("/", (req, res) => {
    res.status(200).sendFile("views/index.html", { root: __dirname });
})

app.post("/", (req, res) => {

    let { sender, password, mails, title, content } = req.body;

    // console.log(mails.split(","), content)

    let allMails = mails.split(",");

    console.log(req.body);


    //Creating Sender
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: sender, // generated ethereal user
            pass: password  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    //Content section
    let mailOptions = {
        from: sender, // sender address
        to: allMails.map(m => m), // list of receivers
        subject: title, // Subject line
        text: content, // plain text body
        // html: `<pre>${content}</pre>` // html body
    };

    //Sending mail from that user
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