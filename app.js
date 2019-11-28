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
    
    var imageURLs= await tools.getRandomImages("", 1); //requires 'async' word before function
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
    var imageURLs= await tools.getRandomImages(keyword, 9); //requires 'async' word before function
    console.log("imageURLS using Promises: " + imageURLs);
    res.render("results.ejs", {"results": imageURLs, "keyword": keyword});
        
});//search

//updateFavorites route
app.get("/api/updateFavorites", function(req, res) {
    
    var conn = tools.createConnection();
    var sql;
    var sqlParams;
    
    //checks the updateFavorite() action attribute from functions.ejs
    if(req.query.action == "add") {
    sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
    sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        sql = "DELETE FROM favorites WHERE imageURL = ?";
        sqlParams = [req.query.imageURL];
    }
    
    conn.connect(function(err) {
        
        if(err) throw err;
        
        conn.query(sql, sqlParams, function(err, result) {
            
            if(err) throw err;
            
        });//query
    });//connect
    
    res.send("it works!");
});//updateFavorites route

//displayKeywords route
app.get("/displayKeywords", async function(req, res) {
    
    var imageURLs= await tools.getRandomImages("", 1); //requires 'async' word before function
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
    
    conn.connect( function(err){
        
        if(err) throw err;
        
        conn.query(sql, function(err, result){
            if(err) throw err;
            res.render("favorites", {"rows":result, "results":imageURLs});
            console.log(result);
        });//query
    });//connect
    
});//displayKeywords route

//displayFavorites route
app.get("/api/displayFavorites", function(req, res) {
    
    var conn = tools.createConnection();
    var sql= "SELECT imageURL FROM favorites where keyword = ?";
    var sqlParams = [req.query.keyword];
    
    conn.connect( function(err){
        
        if(err) throw err;
        
        conn.query(sql, sqlParams, function(err, results){
            if(err) throw err;
            res.send(results);
        });//query
    });//connect
    
});//displayFavorites route


//server listener
app.listen("8080", "127.0.0.1", function() {
    console.log("Running Express Server...");
});