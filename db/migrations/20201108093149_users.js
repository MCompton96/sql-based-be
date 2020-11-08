
exports.up = function(knex) {
    console.log('making users table');
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.increments('user_id').primary().notNullable();
        usersTable.string('name');
        usersTable.string('username');
        usersTable.string('avatarURL');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
