
exports.up = function(knex) {
  return knex.schema.createTable('google_auth', tbl => {
    tbl.increments('id')
    tbl.string('username')
    tbl.string('googleId')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('google_auth')
};
