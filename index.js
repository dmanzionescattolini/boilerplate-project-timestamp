// index.js
// where your node app starts
require("dotenv").config();
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api",function(req, res){
    
    var unix = Date.now();
    var utc =new Date(Date.now()).toUTCString();
    res.json({unix:parseInt(unix),utc:utc})
})
app.get("/api/:date",function(req, res){
  var date= req.params.date;
  
  if(isNaN(date)){
    var unix = Date.parse(date);
    if(isNaN(unix)){
      res.json({error: "Invalid Date"});
    }
    var utc = new Date(unix).toUTCString();
    res.send({unix: parseInt(unix), utc: utc});
  }else {
    var utc = new Date(parseInt(date)).toUTCString();
    res.send({unix: parseInt(date), utc: utc});
  }
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



