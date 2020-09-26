// uncomment to run with local .env file
// require('dotenv').config()

const OAuth = require('oauth');

// uncomment to test tweet function and api keys locally
// tweet('Was looking for a way to process markdown files in vue and found this. Pretty cool! https://vue-showdown.js.org/guide/#npm')

// export function to netlify endpoint
exports.handler = async event => {
    const tweet = event.queryStringParameters.t
    tweet(tweet);
}

function tweet(text) {
    const authobj = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_API_KEY,
        process.env.TWITTER_API_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    var postBody = {
        'status': text
    };

    authobj.post('https://api.twitter.com/1.1/statuses/update.json',
        process.env.TWITTER_ACCESS_TOKEN,
        process.env.TWITTER_TOKEN_SECRET,
        postBody,
        'application/json',
        function (err, data, res) {
            if (err) {
                console.error(err)
                return {
                    statusCode: 500,
                    body: "Failed to send tweet"
                }
            } else {
                console.log('good')
                return {
                    statusCode: 200,
                    body: "Sent tweet successfully"
                }
            }
        });
}



