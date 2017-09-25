const models = require('./../dbmodels/dbmodels.js');
const oauth2Client = require('./../controllers/OauthSenderController.js');
const sendEmail = require('./sendEmail.js');

module.exports = (email, mailer, message, user, lead) => {
  oauth2Client.refreshAccessToken((err, tokens) => {
    console.log('refreshToken module was hit!!!');
    if (err) console.log(`Something went wrong when refreshing accessToken: ${err}`);
    else {
      // update users database record with new access token
      models.users.update({
        gmail_access_token: tokens,
      },
      {
        where: { user_id: user.user_id },
      },
      ).then(() => {
        console.log('this is your new accessToken REFRESHED: ', tokens);
        user.gmail_access_token = tokens;
        sendEmail(email, mailer, message, user, lead);
      })
        .catch((error) => {
          console.log(`Something went wrong when updating user record with new accessToken: ${error}`);
        });
    }
  });
  // using refresh token to grab new access token from Google
  // oauth2Client.getToken(user.gmail_refresh_token, (err, token) => {
  //   if (err) console.log(`Something went wrong when refreshing accessToken: ${err}`);
  //   else {
  //     // update users database record with new access token
  //     models.users.update({
  //       gmail_access_token: token,
  //     },
  //     {
  //       where: { user_id: user.user_id },
  //     },
  //     ).then(() => {
  //       user.gmail_access_token = token;
  //       sendEmail(email, mailer, message, user, lead);
  //     })
  //       .catch((error) => {
  //         console.log(`Something went wrong when updating user record with new accessToken: ${error}`);
  //       });
  //   }
  // });
};