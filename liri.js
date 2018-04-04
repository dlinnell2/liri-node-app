require("dotenv").config();

// connecting all packages
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// For use with requests
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = { screen_name: 'dl_bootcamp' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        //console.log(JSON.parse(JSON.stringify(tweets)));
    }
});

spotify.search({ type: 'track', query: 'Everybody\'s Got Something to Hide Except Me and My Monkey', limit: 1 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // Artist Name
    //console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].album.artists[0].name);
    // Track Name
    //console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].name);
    // Preview Link
    console.log(JSON.parse(JSON.stringify(data.tracks.items))[0]);
    // Album Name
    //console.log(JSON.parse(JSON.stringify(data.tracks.items))[0].album.name);

});

