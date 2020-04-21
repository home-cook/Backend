const express = require('express');
const server = express();

const authRouter = require('./auth/local-router')

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api: "Hello"})
})

server.use('/api/auth', authRouter);

module.exports = server;