var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    nodemailer      = require("nodemailer"),
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'automatedcristoreyreminder@gmail.com',
            pass: process.env.PASS
        }
    });
    
// Don't have to say file.ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Able to automatically use public folder to access styling and other stuff like js files.
app.use(express.static(__dirname + "/public"));

// Routes
app.get("/", function(req, res){
    res.render("home");
});

app.post("/sendMessage", function(req, res){
    var htmlMessage = `
                    <div style="width: 100%; text-align: center;">
                        <p style="color: #009FFD; font-size: 25px;">${req.body.first} ${req.body.last}</p>
                    
                        <p style="color: #2F2D2E; font-size: 20px;">
                            Email: ${req.body.email}
                        </p>
                        
                        <p style="color: #2F2D2E; font-size: 20px;">Phone:
                            ${req.body.tel}
                        </p>
                        
                        <p style="color: #A30016; font-size: 25px;">${req.body.message}</p>
                    </div>
            `;
            
            var mailOptions = {
                from: 'YourBot',
                to: 'abemorenobusiness@gmail.com',
                subject: 'New Contact',
                text: "",
                html: htmlMessage
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } 
                else {
                    res.redirect("/");
                    console.log('Email sent: ' + info.response);
                }
            });
            
});

app.get("*", function(req, res){
    res.redirect("/");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});