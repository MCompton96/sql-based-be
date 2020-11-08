// exports.filterRestaurant = (restaurantData, cityData) => {
//     const copyRestaurant = [...restaurantData];
//     const thirdRestaurant = copyRestaurant.map(restaurant => {
//         const city = cityData.filter(city => city["name"] === restaurant["city_name"])
//         if(!city.length) return restaurant
//         const newRestaurant = {...restaurant}
//         newRestaurant["city_id"] = city[0]["_id"]
//         delete newRestaurant["city_name"]
//         return newRestaurant
//     })
//     return thirdRestaurant
// }

// exports.filterReviews = (reviewData, restaurantData, userData) => {
//     const copyReview = [...reviewData]
//     const cleanedData = copyReview.map(review => {
//         const restaurant = restaurantData.filter(restaurant => restaurant["name"] === review["restaurant_name"])
//         const user = userData.filter(user => user["name"] === review["user_name"])
//         const newReview = {...review}
//         newReview["restaurant_id"] = restaurant[0]["_id"]
//         delete newReview["restaurant_name"]
//         newReview["user_id"] = user[0]["_id"]
//         delete newReview["user_name"]
//         return newReview
//     })
//     return cleanedData
// }

exports.formatBelongsTo = (commentData, articleData, lookfor, oldKey, referenceKey) => {
    const lookup = {}
    const newCommentData = [];
    articleData.forEach((article) => {
        lookup[article[referenceKey]] = article[lookfor];
    })
    commentData.forEach((comment, i) => {
        newCommentData.push({...comment});
        newCommentData[i][lookfor] = lookup[comment[oldKey]];
        delete newCommentData[i][oldKey];
    })
    return newCommentData;
}

exports.renameKey = (commentData, keyToChange, newKey) => {
    const newCommentData = []
    
    commentData.forEach((comment, i) => {
        newCommentData.push({...comment});
        const temp = newCommentData[i][keyToChange];
        newCommentData[i][newKey] = temp;
        delete newCommentData[i][keyToChange];
    });
    return newCommentData;
};