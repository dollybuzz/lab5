//Note - used 'npm i -g nodemon' to install nodemon globally
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes
//root route
app.get("/", async function(req, res) { //'async' is for Promise method
    
    var imageURLs= await tools.getRandomImages("", 1); //requires 'async' word before function on line 30
    //console.log("imageURLS using Promises: " + imageURLs);
    res.render("index.ejs", {"results": imageURLs});
});//root route

//search route
app.get("/search", async function(req, res) { //'async' is for Promise method
    //console.dir(req); //allows us to see all properties
    //console.log(req.query.keyword); //keyword is the name of the parameter passed in the form
    var keyword = req.query.keyword;
    
    //the next line will NOT work for asynchronous functions, the imageURLs variable will be undefined
    //var imageURLs = getRandomImages(keyword, 9);
    
    //CALLBACK METHOD
    /*getRandomImages_cb(keyword, 9, function(imageURLs){
        console.log("imageURLS: " + imageURLs);
        res.render("results.ejs", {"results": imageURLs});
    })*/
    
    //PROMISE METHOD
    var imageURLs= await tools.getRandomImages(keyword, 9); //requires 'async' word before function on line 30
    console.log("imageURLS using Promises: " + imageURLs);
    res.render("results.ejs", {"results": imageURLs});
        
});//search


//server listener
app.listen("8080", "127.0.0.1", function() {
    console.log("Running Express Server...");
});