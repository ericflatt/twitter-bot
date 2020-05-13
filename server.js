/* Setting things up. */
const express = require( 'express' ),
      app = express(),   
      Twit = require( 'twit' ),
      config = {
      /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
        twitter: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token: process.env.TWITTER_ACCESS_TOKEN,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        }
      },
      T = new Twit( config.twitter );

app.use( express.static( 'public' ) );

/* You can use cron-job.org, uptimerobot.com, or a similar site to periodically visit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all( `/${process.env.BOT_ENDPOINT}`, function( req, res ){

  /* The example below tweets out "Hello world!". */
  
  T.post( 'statuses/update', { status: 'You are stuck in the 20th century if you are still tweeting from an iphone' }, function( err, data, response ) {
    if ( err ){
      console.log( 'error!', err );
      res.sendStatus( 500 );
    }
    else{
      res.sendStatus( 200 );
    }
  } );
} );

let listener = app.listen( process.env.PORT, function(){
  console.log( 'Your bot is running on port ' + listener.address().port );
} );