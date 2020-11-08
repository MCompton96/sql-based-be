
exports.up = function(knex) {
    console.log('making reviews table');
    return knex.schema.createTable('reviews', (reviewsTable) => {
        reviewsTable.increments('review_id').primary().notNullable();
        reviewsTable.text('body').notNullable();
        reviewsTable.integer('rating').notNullable();
        reviewsTable.integer('restaurant_id').references('restaurants.restaurant_id').notNullable().onDelete('CASCADE');
        reviewsTable.integer('user_id').references('users.user_id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
};
