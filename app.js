const TwitterPackage = require('twitter');
const { consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret } = require('./config');

var secret = {
    consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
}

const Twitter = new TwitterPackage(secret);

//Handles posting on a status on my behalf


// Twitter.post('statuses/update', {status: 'Testing twitter posts for/from a new bot'},  function(error, tweet, response){
//     if(error){
//       console.log(error);
//     }
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
//   });

//opens twitter stream, consistently looking "track" and whatever its value is. When that is found, fires function which then hearts that tweet id

Twitter.stream('statuses/filter', {track: '#100DaysofCode, #codeNewbie'}, function(stream) {
    stream.on('data', function(tweet) {
    
        if ( tweet.favorited === true){
            console.log("Caught a favorited one!!");
          } else {
      Twitter.post(`favorites/create`, {id: tweet.id_str},  function(error, tweet, response){
        if(error){
          console.log(error);
        }
        console.log("success!", tweet.text)
      });
    }
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
  });