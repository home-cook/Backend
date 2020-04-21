const knex = require('knex');
const db = knex(require('./knexfile').production);


module.exports = db;