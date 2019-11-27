//Note - used 'npm i -g nodemon' to install nodemon globally
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");

//routes
//root route
app.get("/", function(req, res) {
    var requestURL = "https://api.unsplash.com/photos/random?client_id=079b4e9f05b286d943c3d8eb4ba519395d27a2ba8c556c58213d8275234fd396&orientation=landscape";
    request(requestURL, function(error, response, body) {
        //console.log("error:", error); //Print the error if one occurred
        //console.log("statusCode:", response && response.statusCode);
        //console.log("body:", body); //Print the API data
        if (!error) {
            var parsedData = JSON.parse(body);
            //console.log("image url:", parsedData["urls"]["regular"]);
            var imageURL = parsedData["urls"]["regular"];
            res.render("index.ejs", {"imageURL": imageURL});
        } else {
            res.render("index.ejs", {"error": "Unable to access API"});
        }
    });//request
});//root route

app.get("/search", function(req, res) { 
    //console.dir(req);
    //console.log(req.query.keyword); //keyword is the name of the parameter passed in the form
    var keyword = req.query.keyword;
    //the next line will NOT work for asynchronous functions, the imageURLs variable will be undefined
    //var imageURLs = getRandomImages(keyword, 9);
    
    getRandomImages_cb(keyword, 9, function(imageURLs){
        console.log("imageURLS: " + imageURLs);
        res.render("results.ejs", {"results": imageURLs});
    })
    
});//search

/*
Return random image URLs from an API
@param string keyword - search tearm
@param int imageCount - number of random images
@return array of image URLs
*/
function getRandomImages_cb(keyword, imageCount, callback){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=079b4e9f05b286d943c3d8eb4ba519395d27a2ba8c556c58213d8275234fd396&orientation=landscape";
    request(requestURL, function(error, response, body) {
        if (!error) {
            var parsedData = JSON.parse(body);
            //console.log("image url:", parsedData["urls"]["regular"]);
            var imageURLs = [];
            
            for(let i = 0; i < 9; i++)
            {
                imageURLs.push(parsedData[i].urls.regular);
            }
            //console.log(imageURLs);
            
            //return imageURLs;
            callback(imageURLs);
            
        } else {
            console.log("error", error);
        }
    });//request
}

//server listener
app.listen("8080", "127.0.0.1", function() {
    console.log("Running Express Server...");
});