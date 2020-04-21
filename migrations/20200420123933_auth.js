
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id')
    tbl.string('email').unique().notNullable()
    tbl.string('password')
    tbl.dateTime('created_at').defaultTo(knex.fn.now(3))
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
