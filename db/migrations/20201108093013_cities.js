
exports.up = function(knex) {
    console.log('making cities table');
    return knex.schema.createTable('cities', (citiesTable) => {
        citiesTable.increments('city_id').primary().notNullable();
        citiesTable.string('name').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cities');
};
