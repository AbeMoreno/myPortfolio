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

app.get("*", function(req, res){
    res.redirect("/");
});
    
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});