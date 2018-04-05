require("dotenv").config();

// connecting all packages
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var moment = require('moment-timezone');

// For use with requests
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// taking user input
var command = process.argv[2];
var input;

if (process.argv[3]) {

    if (process.argv[3].startsWith('\'')) {
        input = process.argv[3];
    } else {
        var inputArr = process.argv;
        inputArr.splice(0, 3);
        input = inputArr.join(' ');
    }

}


function run() {

    switch (command) {
        case 'my-tweets':
            var params = {
                screen_name: 'dl_bootcamp',
                count: 20
            };
            client.get('statuses/user_timeline', params, function (err, data, response) {

                if (err) return console.log(err);

                var tweets = JSON.parse(JSON.stringify(data));

                for (var i in tweets) {
                    //console.log(tweets[i]);

                    var dateArr = tweets[i].created_at.split(' ');
                    dateArr.splice(4, 1);
                    dateArr.splice(0, 1);
                    var newDate = dateArr.join(' ');

                    var newMom = moment(newDate, 'MMM-DD-HH-mm-ss-YYYY').tz("America/Chicago")
                    var tweetDate = newMom.format('MMM DD YYYY');
                    var tweetTime = newMom.format('hh:mm A z');

                    console.log(`On ${tweetDate} at ${tweetTime} you tweeted "${tweets[i].text}"`);
                }

            });
            break;

        case 'spotify-this-song':

            if (!input) {
                input = 'the sign';
            }

            spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
                if (err) return console.log(err);

                var songData = JSON.parse(JSON.stringify(data.tracks.items))[0];
                var artist = songData.album.artists[0].name;
                var track = songData.name;
                var previewLink = songData.preview_url;
                var album = songData.album.name;

                console.log(`You searched for "${track}." That is a song by ${artist} off of the album "${album}."`);
                if (previewLink === null) {
                    console.log(`Sorry! Unfortunately, that song doesn't have a preview available.`)
                } else {
                    console.log(`Follow this link to hear a preview! ${previewLink}`);
                }

            });
            break;

        case 'movie-this':

            if (!input) {
                input = 'mr nobody'
            };

            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

            request(queryUrl, function (err, response, body) {

                if (err) return console.log(err)

                var movie = JSON.parse(body);

                console.log(`          Thanks! Here's some basic info on your film!
                Title: ${movie.Title}
                Year of Release: ${movie.Year}
                IMDB Rating: ${movie.Ratings[0].Value}
                Rotten Tomatoes Rating: ${movie.Ratings[1].Value}
                Produced In: ${movie.Country}
                Languages in Film: ${movie.Language}
                Plot Summary: ${movie.Plot}
                Actors in Film: ${movie.Actors}`);

            });
            break;

        default:
            console.log(`       Sorry! I don't recognize that command. Please enter one of the following.
        -> 'my-tweets' - displays your last 20 tweets and when created
        -> 'spotify-this-song' '<type song name here>' - display basic information about the song from spotify
        -> 'movie-this' '<type movie title here>' - display basic information about the movie from OMDB
        -> 'do-what-it-says' - executes a command written in an external text file`);
            break;

    };

};


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


