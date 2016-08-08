var http = require('http');
var express = require('express');
var app = express();

app.get('/wam/google/places', places);

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Starting the DNL WAM on port ' + app.get('port'));
});

function places(req, res) {
    var apiKey = 'AIzaSyDgT571g_5t7Gs7F2QD6SKFy0xNpFbXDaE';
    var placeId = 'ChIJEwu80FGk6IgRN6w1XJkluZA';//req.params.placeId;
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + apiKey;

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
