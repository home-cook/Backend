const router = require('express').Router();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../../config/keys')
const Users = require('./google-model')
const cookieSession = require('cookie-session')

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    Users.findById(id)
        .then(user => {
            done(null,user)
        })
})

passport.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['abcdefghijklmnopqrstuvwxyz1234567890']
}))

passport.use(
    new GoogleStrategy({
        clientID:keys.google.client_id,
        clientSecret:keys.google.client_secret,
        callbackURL: '/api/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // token we receive from google to go back and do things with users profile.
    // refresh token to refresh the accesstoken which expires.
    // done, function we need to call when we are done with above info.
    console.log(profile)
    Users.findUser(profile.id)
        .then(currentUser => {
            console.log('currentUser', currentUser)
            user = {
                username:profile.displayName,
                googleId:profile.id
            }
            if (currentUser == undefined) {
                Users.addUser(user)
                done(null, user)
            } else {
                done(null, currentUser)
            }
        })
        .catch(err => console.log(err))
}))

router.get('/', passport.authenticate('google',{
    scope:['profile']
}))

// callback

router.get('/redirect', passport.authenticate('google'),(req,res) => {
    console.log(req.user)
    res.send('User is logged in.')
})

module.exports = router