const router = require('express').Router();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../../config/keys')

passport.use(
    new GoogleStrategy({
        clientID:keys.google.client_id,
        clientSecret:keys.google.client_secret,
        callbackURL: '/api/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // token we receive from google to go back and do things with users profile.
    // refresh token to refresh the accesstoken which expires.
    // done, function we need to call when we are done with above info.
    console.log('passport callback function fired')
}))

router.get('/', passport.authenticate('google',{
    scope:['profile']
}))

// callback

router.get('/redirect', passport.authenticate('google'),(req,res) => {
    res.send('callback URI')
})

module.exports = router