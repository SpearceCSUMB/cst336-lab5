const request = require('request');
const mySql = require("mysql");

module.exports = {

/**
* Return random image URLs from an API
* @param string keyword - search term
* @param init imageCount - number of random iamges
* @retrun array of image URLs
*/
getRandomImages_cb: function (keyword, imageCount, callback) {
    let requestURL = "https://api.unsplash.com/photos/random/?query=" + keyword + "&count="+ imageCount +"&orientation=landscape&client_id=25a3ed8ebee4850bb0a5933bb557b0de0eec3b0aa1d306253033a66bfa7b4ddf"
    request(requestURL, function (error, response, body) {
    console.log('error', error);
    
    if (!error) {
      let photoData = JSON.parse(body);
      let imageURLs = [];
      
      for (let i = 0; i < photoData.length; i++) {
        imageURLs.push(photoData[i].urls.regular);
      }
      console.log(imageURLs);
      //return imageURLs;
      callback(imageURLs);
    }
  });
},

/**
* Return random image URLs from an API
* @param string keyword - search term
* @param init imageCount - number of random iamges
* @retrun array of image URLs
*/
getRandomImages: function(keyword, imageCount) {
    let requestURL = "https://api.unsplash.com/photos/random/?query=" + keyword + "&count="+ imageCount +"&orientation=landscape&client_id=25a3ed8ebee4850bb0a5933bb557b0de0eec3b0aa1d306253033a66bfa7b4ddf"
    
    return new Promise( function(resolve, reject) {
      request(requestURL, function (error, response, body) {
      console.log('error', error);
    
      if (!error) {
        let photoData = JSON.parse(body);
        let imageURLs = [];
      
        for (let i = 0; i < photoData.length; i++) {
          imageURLs.push(photoData[i].urls.regular);
        }
       console.log(imageURLs);
       resolve(imageURLs);
    }
    }); //request
  }); //promise
},//function
  
  /*
  * creates database connection
  * @return db connection
  */
  createConnection: function(){
    var conn = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "img_gallery"
  });
    return conn;
  }
}

