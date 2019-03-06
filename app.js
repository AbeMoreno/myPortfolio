var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");
    
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
    const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                    {
                            "From": {
                                    "Email": "abemorenobusiness@gmail.com",
                                    "Name": "Abe"
                            },
                            "To": [
                                    {
                                            "Email": "abemorenobusiness@gmail.com",
                                            "Name": "Abe"
                                    }
                            ],
                            "Subject": "New Contact",
                            "TextPart": "",
                            "HTMLPart": `Phone Number: ${req.body.tel}
                            <br>
                            ${req.body.message}
                            <br>
                            email: ${req.body.email}
                            <br>
                            name: ${req.body.first} ${req.body.last}
                            `
                    }
            ]
        });
    
    request
        .then((result) => {
        console.log(result.body);
    })
    .catch((err) => {
        console.log(err.statusCode);
    });  
    
    res.redirect("/");
});

app.get("*", function(req, res){
    res.redirect("/");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});