const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('./local-model');

router.post('/signup', (req,res) => {

    let { email, password } = req.body;

    if(email && password){
        password = bcrypt.hashSync(password,13);
        Users.SignUp({email,password})
            .then(user => {
                res.status(201).json({message:`User with email address ${user.email} was successfully created.`})
            })
            .catch(err => {
                err.status(500).json({message:'Something went wrong during user registration.'})
            })
    } else {
        res.status(400).json({message:'Bad Request'})
    }
});

router.post('/signin', (req,res) => {

    let { email, password } = req.body;

    if(email && password){

        Users.SignIn(req.body)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user)
                    res.status(200).json({token:token})
                } else {
                    res.status(401).json({message:'Invalid username or password.'})
                }
            })
            .catch(err => {
                err.status(500).json({message:'Something went wrong during signin process.'})
            })
    } else {
        res.status(400).json({message:'Username & password required.'})
    }
})

module.exports = router;

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const secret = process.env.SECRET;
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}