
exports.up = function(knex) {
    console.log('making restaurants table');
    return knex.schema.createTable('restaurants', (restaurantsTable) => {
        restaurantsTable.increments('restaurant_id').primary().notNullable();
        restaurantsTable.string('name').notNullable();
        restaurantsTable.string('cuisine').notNullable();
        restaurantsTable.text('logo').notNullable();
        restaurantsTable.integer('city_id').references('cities.city_id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('restaurants');
};
