// uncomment to run with local .env file
//require('dotenv').config()

const OAuth = require('oauth');

// uncomment to test tweet function and api keys locally
//tweeter('cleaning up some tests')

// export function to netlify endpoint
exports.handler = async event => {
    const tweet = event.queryStringParameters.t
    console.log(tweet);
    return tweeter(tweet);
}

function tweeter(text) {
    const twitter = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_API_KEY,
        process.env.TWITTER_API_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    twitter.post('https://api.twitter.com/1.1/statuses/update.json',
        process.env.TWITTER_ACCESS_TOKEN,
        process.env.TWITTER_TOKEN_SECRET,
        { "status": text },
        'application/json',
        function (err, data, res) {
            if (err) {
                console.error(err)
                callback(null, {
                    statusCode: 500,
                    body: "Failed to send tweet"
                })
            } else {
                console.log('good')
                callback(null, {
                    statusCode: 200,
                    body: "Sent tweet successfully"
                });
            }
        });
}



