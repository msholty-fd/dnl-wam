var https = require('https');
var fs = require('fs');
var pem = require('pem');
var express = require('express');
var app = express();
var cors = require('cors');
var corsOptions = {
    allowedHeaders: 'Authorization'
};
var config = require('./config.js');

var accessToken;

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    next();
});

app.get('/google/places', places);

console.log('Starting up dnl-wam. Listening on port 3000');
console.log('endpoints: \n/google/places');
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(3000);

function places(req, res) {
    var apiKey = 'AIzaSyDgT571g_5t7Gs7F2QD6SKFy0xNpFbXDaE';
    var placeId = 'ChIJEwu80FGk6IgRN6w1XJkluZA';//req.params.placeId;
    console.log('req.params:', req.params);
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

    var options = {
        method: 'GET',
        url: url
    };

    console.log('url:', url);
    var request = require('request');
    return request(options, function(error, response, body) {
        console.log('response status code:', response.statusCode);
        if (error) throw new Error(error);
        res.send(body);
    });
}
