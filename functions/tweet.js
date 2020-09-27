const Twitter = require('twitter');

exports.handler = (event, context, callback) => {
    const twitter = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET
    });
    const tweet = event.queryStringParameters.t
    twitter.post('statuses/update', { "status": tweet }, function (err, tweet, res) {
        if (!err) {
            console.log(tweet + " => good");
            callback(null, {
                statusCode: 200,
                body: "Tweet sent successfully."
            });
        } else {
            console.log(err);
            callback(err, {
                statusCode: 500,
                body: "Tweet failed to send."
            });
        }
    })
}


