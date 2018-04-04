require("dotenv").config();

// connecting all packages
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// For use with requests
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

/* var params = { screen_name: 'dl_bootcamp' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(JSON.parse(JSON.stringify(tweets)));
    }
}); */

/* spotify.search({ type: 'track', query: 'Everybody\'s Got Something to Hide Except Me and My Monkey', limit: 1 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // Artist Name
    console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].album.artists[0].name);
    // Track Name
    console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].name);
    // Preview Link
    console.log(JSON.parse(JSON.stringify(data)).tracks.items[0].preview_url);
    // Album Name
    console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].album.name);

}); */

var movieName = 'Batman Begins'

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body){

    if (!error && response.statusCode === 200){

        var movie = JSON.parse(body);

        console.log(`Thanks! Here's some basic info on your film!
        Title: ${movie.Title}
        Year of Release: ${movie.Year}
        IMDB Rating: ${movie.Ratings[0].Value}
        Rotten Tomatoes Rating: ${movie.Ratings[1].Value}
        Produced In: ${movie.Country}
        Languages in Film: ${movie.Language}
        Plot Summary: ${movie.Plot}
        Actors in Film: ${movie.Actors}`);

    }
});

