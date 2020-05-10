require('dotenv').config({ debug: process.env.DEBUG })
const server = require('./api/server');


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('SERVER IS UP ON PORT', port)
})