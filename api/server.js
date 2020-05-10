const express = require('express');
const server = express();

const authRouter = require('./auth/local-router');
const authGoogleRouter = require('./auth/google-router');

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api: "Hello"})
})

server.use('/api/auth/local', authRouter);
server.use('/api/auth/google', authGoogleRouter);

module.exports = server;