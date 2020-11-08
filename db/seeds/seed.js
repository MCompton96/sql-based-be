const {
    cityData, 
    restaurantData,
    reviewData, 
    userData
} = require('../data/index');

const { formatBelongsTo } = require('../utils/data-manipulation');

exports.seed = function(knex) {
    return knex.migrate.rollback()
    .then(() => {
        return knex.migrate.latest()
    }).then(() => {
        console.log('Starting seeding');
        return knex
        .insert(cityData)
        .into('cities')
        .returning('*')
    }).then((cityTable) => {
        let newRestaurantData = formatBelongsTo(restaurantData, cityTable, 'city_id', 'city_name', 'name');
        return knex('restaurants')
        .insert(newRestaurantData)
        .returning('*')
    }).then((restaurantTable) => {
        const dataInsert = knex
        .insert(userData)
        .into('users')
        .returning('*')
        return Promise.all([restaurantTable, dataInsert])
    }).then((res) => {
        let newReviewData = formatBelongsTo(reviewData, res[0], 'restaurant_id', 'restaurant_name', 'name');
        newReviewData = formatBelongsTo(newReviewData, res[1], 'user_id', 'user_name', 'username');
        return knex
        .insert(newReviewData)
        .into('reviews')
        .returning('*')
    })
        // const newRestaurantData = formatBelongsTo(restaurantData, cityTable, 'city_id', 'city_name', 'name');
        // return knex
        // .insert(newRestaurantData)
        // .into('restaurants')
        // .returning('*')
    // }).then((restaurantTable) => {
    //     console.log(restaurantTable)
    //     const dataInsert = knex
    //     .insert(userData)
    //     .into('users')
    //     .returning('*')
    //     return Promise.all([restaurantTable, dataInsert])
    // }).then((res) => {
    //     const newReviews = formatBelongsTo(reviewData, res[0], 'restaurant_id', 'restaurant_name', 'name');
    //     const newReviewData = formatBelongsTo(newReviews, res[1], 'user_id', 'user_name', 'username');
    //     console.log(newReviewData);
    //     return knex
    //     .insert(newReviewData)
    //     .into('reviews')
    //     .returning('*')
    // })
}