var https = require('https');
var fs = require('fs');
var pem = require('pem');
var express = require('express');
var app = express();
var cors = require('cors');
var corsOptions = {
    allowedHeaders: 'Authorization'
};

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
    var apiKey = 'AIzaSyCwlVHbm34Cbq1rV2mW4MHGP1gBcu7vw9M';
    var placeId = req.params.placeId;
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

    var options = {
        method: 'GET',
        url: url
    };

    var request = require('request');
    return request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
}
