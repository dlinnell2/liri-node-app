require("dotenv").config();

// connecting all packages
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

// For use with requests
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

if (command === 'do-what-it-says') {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) return console.log(err);

        var dataArr = data.split(',')

        command = dataArr[0];

        input = dataArr[1];

        run();

    })


} else {

    run();
}


function run() {

    switch (command) {
        case 'my-tweets':
            var params = { screen_name: 'dl_bootcamp' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    console.log(JSON.parse(JSON.stringify(tweets)));
                }
            });
            break;

        case 'spotify-this-song':
            if (!input) {
                input = 'the sign'
            }

            spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                var songData = JSON.parse(JSON.stringify(data.tracks.items))[0];

                // Artist Name
                console.log(songData.album.artists[0].name);
                // Track Name
                console.log(songData.name);
                // Preview Link
                console.log(songData.preview_url);
                // Album Name
                console.log(songData.album.name);

            });
            break;

        case 'movie-this':

            if (!input) {
                input = 'mr nobody'
            };

            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

            request(queryUrl, function (error, response, body) {

                if (!error && response.statusCode === 200) {

                    var movie = JSON.parse(body);

                    console.log(`           Thanks! Here's some basic info on your film!
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
            break;

        default:
            console.log(`       Sorry! I don't recognize that command. Please enter one of the following.
        -> my-tweets - displays your last 20 tweets and when created
        -> spotify-this-song '<type song name here>' - display basic information about the song from spotify
        -> movie-this '<type movie title here>' - display basic information about the movie from OMDB
        -> do-what-it-says - executes a command written in an external text file`);
            break;

    };

};

