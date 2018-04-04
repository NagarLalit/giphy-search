const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "fq9VUNKkvEz6fRbvu03adUS6KEv4utJv";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, result) {
    //result.send("Welcome to giphy search");
    result.render('index');
});

app.post('/getgif', function(req, res) {
    let searchTerm = req.body.userSearch;
    console.log("User searched for : " + searchTerm);
    let url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=5";
    request(url, function(err, response, body) {
        if (err) {
            res.send({ status: 400, message: "server is unreachable", data: {} });
        } else {
            let gifData = JSON.parse(body).data;
            res.send({ status: 200, message: "gif data found", data: gifData });
        }
    });
});

app.listen(3000, function() {
    console.log("Giphy search running on port 3000.");
});