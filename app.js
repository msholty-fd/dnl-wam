var http = require('http');
var express = require('express');
var NodeCache = require("node-cache");
var googleCache = new NodeCache({ stdTTL: 604800 });
var request = require('request');
var router = express.Router();
var app = express();

router.get('/google/places', places);
app.use('/wam', router);
app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), start);

function start() {
    console.log('Starting the DNL WAM on port ' + app.get('port'));
}

function places(req, res) {
    var apiKey = 'AIzaSyDgT571g_5t7Gs7F2QD6SKFy0xNpFbXDaE';
    var placeId = 'ChIJEwu80FGk6IgRN6w1XJkluZA';
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + apiKey;

    var options = {
        method: 'GET',
        url: url
    };

    googleCache.get("google.places", function(err, value) {
        if (!err) {
            if (value == undefined) {
                request(options, function(error, response, body) {
                    console.log('response status code:', response.statusCode);
                    if (error) throw new Error(error);
                    googleCache.set('google.places', body);
                    res.send(body);
                });
            } else {
                console.log('returning cached value');
                res.send(value);
            }
        }
    });
}
