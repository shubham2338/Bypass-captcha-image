var fs = require('fs'),
http = require('http'),
https = require('https');
  
var Stream = require('stream').Transform;
  
var downloadImageFromURL = (url, filename, callback) => {
  
    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }
  
    client.request(url, function(response) {                                        
      var data = new Stream();                                                    
  
      response.on('data', function(chunk) {                                       
         data.push(chunk);                                                         
      });                                                                         
  
      response.on('end', function() {                                             
         fs.writeFileSync(filename, data.read());                               
      });                                                                         
   }).end();
};

const lnk = 'url image link'; // here paste captcha url image link
downloadImageFromURL(lnk, 'it.png');  // here we pass link and call back function

const Captcha = require('2captcha');
const fs = require('fs');
const api = 'api key'; // we paste api key here
const solver = new Captcha.Solver(api);

solver
    .imageCaptcha(fs.readFileSync('./it.png', 'base64'))
    .then((res) => { console.log(res); })
    .catch((err) => {  console.log(err); });