const GoogleAuth = require('google-auth-library');
const secret = require('../client_secret.json');

const clientSecret = secret.web.client_secret;
const clientId = secret.web.client_id;
const redirectUrl = secret.web.redirect_uris[0];
const auth = new GoogleAuth();
const OauthSender = new auth.OAuth2(clientId, clientSecret, redirectUrl);
console.log('oauthSender', OauthSender);
module.exports = OauthSender;
