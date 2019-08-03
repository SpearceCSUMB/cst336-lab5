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
  * mysql://b7f6ca922e0e44:d9ac1b46@us-cdbr-iron-east-02.cleardb.net/heroku_84e2ba2d533bf90?reconnect=true
  */
  createConnection: function(){
    var conn = mySql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b7f6ca922e0e44",
    password: "d9ac1b46",
    database: "heroku_84e2ba2d533bf90"
   
  });
    var sql;
    sql = "CREATE TABLE IF NOT EXISTS favorites( id INT AUTO_INCREMENT, imageURL VARCHAR(250), keyword VARCHAR(25), PRIMARY KEY(id))";
    
    conn.connect( function(err) {
      if (err) throw err;
      
      conn.query(sql, function(err, result){
        if (err) throw err;
      })
    })
    return conn;
  }
}

