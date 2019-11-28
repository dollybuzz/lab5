const request = require("request");
const mysql = require("mysql");

module.exports = {
/*
Return random image URLs from an API
@param string keyword - search tearm
@param int imageCount - number of random images
@return array of image URLs
*/
//function getRandomImages_cb(keyword, imageCount, callback){
getRandomImages_cb: function (keyword, imageCount, callback){
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
    
}, //commas are required between functions

/*
Return random image URLs from an API
@param string keyword - search tearm
@param int imageCount - number of random images
@return array of image URLs
*/
//function getRandomImages_promise(keyword, imageCount){
getRandomImages: function (keyword, imageCount){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=079b4e9f05b286d943c3d8eb4ba519395d27a2ba8c556c58213d8275234fd396&orientation=landscape";
    
    return new Promise( function(resolve, reject) {
        request(requestURL, function(error, response, body) {
        if (!error) {
            var parsedData = JSON.parse(body);
            //console.log("image url:", parsedData["urls"]["regular"]);
            var imageURLs = [];
            
            for(let i = 0; i < imageCount; i++)
            {
                imageURLs.push(parsedData[i].urls.regular);
            }
            //console.log(imageURLs);
            
            //return imageURLs;
            resolve(imageURLs);
            
        } else {
            console.log("error", error);
        }
    });//request
    });//promise
}, 

/*
Creates database connection
@return db connection
*/
createConnection: function (){
    var conn = mysql.createConnection({
        host: "cst336db.space", //not localhost since this is Professor's server
        user: "cst336_dbUser007",
        password: "qbqxba",
        database: "cst336_db007"
    });
    
    return conn;
}

}//end module.exports