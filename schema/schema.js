const graphql = require('graphql');
const knex = require('../db/connection');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const CityType = new GraphQLObjectType({
    name: 'City',
    fields: () => ({
        city_id: { type: GraphQLID},
        name: { type: GraphQLString},
        restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(parent, args) {
                return knex("restaurants")
                .select("*")
                .where({"city_id": parent.city_id})
            }
        }
    })
});

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        restaurant_id: { type: GraphQLID },
        name: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        city: {
            type: CityType,
            resolve(parent, args) {
                return knex("cities")
                .select("*")
                .where({"city_id": parent.city_id})
                .then((city) => {
                    return city[0]
                })
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent, args) {
                return knex("reviews")
                .select("*")
                .where({"restaurant_id": parent.restaurant_id})
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        user_id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        avatarURL: { type: GraphQLString },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent, args) {
                return knex("reviews")
                .select("*")
                .where({ "user_id": parent.user_id})
            }
        }
    })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        review_id: { type: GraphQLID },
        body: { type: GraphQLString },
        rating: { type: GraphQLInt },
        restaurant: {
            type: RestaurantType,
            resolve(parent, args) {
                return knex("restaurants")
                .select("*")
                .where({ "restaurant_id": parent.restaurant_id})
                .then((restaurant) => {
                    return restaurant[0]
                })
            }
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return knex("users")
                .select("*")
                .where({ "user_id": parent.user_id})
                .then((user) => {
                    return user[0]
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        city: {
            type: CityType,
            args: { city_id: { type: GraphQLID } },
            resolve(parent, args) {
                return knex("cities")
                .select("*")
                .where({ "city_id": args.city_id})
                .then((city) => {
                    return city[0]
                })
            }
          },
          // Get all cities
          cities: {
            type: new GraphQLList(CityType),
            resolve(parent, args) {
                return knex("cities")
                .select("*")
            }
          },
          // GET single restaurant
          restaurant: {
            type: RestaurantType,
            args: { restaurant_id: { type: GraphQLID } },
            resolve(parent, args) {
               return knex("restaurants")
               .select("*")
               .where({ "restaurant_id": args.restaurant_id})
               .then((restaurant) => {
                   return restaurant[0]
               })
            }
          },
          // GET all restaurants
          restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(parent, args) {
                return knex("restaurants")
                .select("*")
            }
          },
          // GET all reviews
          reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent, args) {
                return knex("reviews")
                .select("*")
            }
          },
          // GET all users
          users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return knex("users")
                .select("*")
            }
          },
          // GET Single User
          user: {
            type: UserType,
            args: { user_id: { type: GraphQLID } },
            resolve(parent, args) {
                return knex("users")
                .select("*")
                .where({ "user_id": args.user_id})
            }
          }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      // City POST Request
      addCity: {
        type: CityType,
        args: {
          name: {
            type: GraphQLString
          }
        },
        resolve(parent, args) {
            
        }
      },
      // Restaurant POST request
      addRestaurant: {
        type: RestaurantType,
        args: {
          name: {
            type: GraphQLString
          },
          cuisine: {
            type: GraphQLString
          },
          city_id: {
            type: GraphQLString
          }
        },
        resolve(parent, args) {
          
        }
      },
      // User POST request
      addUser: {
        type: UserType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString)},
          avatarURL: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString)}
          // friends: { type: GraphQLString }
        },
        resolve(parent, {name, avatarURL, username}) {
            return knex
            .insert({ name, avatarURL, username})
            .into("users")
            .returning("*")
            .then((result) => {
                return result;
            })
        }
      },
      // PATCH Add friend to user
      addFriend: {
        type: UserType,
        args: {
          user_id: { type: GraphQLID },
          friend_id: { type: GraphQLID }
        },
        resolve(parent, { user_id, friend_id }) {

          }
      },
      // Review POST request
      addReview: {
        type: ReviewType,
        args: {
          body: { type: GraphQLString },
          rating: { type: new GraphQLNonNull(GraphQLInt) },
          restaurant_id: { type: new GraphQLNonNull(GraphQLString) },
          user_id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, { body, rating, restaurant_id, user_id }) {
            return knex
            .insert({ body, rating, restaurant_id, user_id})
            .into("reviews")
            .returning("*")
            .then(result => {
                return result;
            })
        }
      },
      // PATCH User
      updateUser: {
        type: UserType,
        args: {
          user_id: { type: GraphQLID},
          username: {type: GraphQLString},
          avatarURL: {type: GraphQLString},
          name: {type: GraphQLString}
        },
        resolve(parent, {user_id, username, avatarURL, name}) {
          
        }
      },
      // PATCH Review
      // DELETE User
      deleteUser: {
          type: UserType,
          args: {
              user_id: { type: GraphQLID }
          },
          resolve(parent, { user_id }) {
              return knex("users")
              .delete()
              .where({ user_id })
          }
      },
      // DELETE Review
      deleteReview: {
          type: ReviewType,
          args: {
              review_id: { type: GraphQLID }
          },
          resolve(parent, { review_id }) {
              return knex("reviews")
              .delete()
              .where({ review_id })
          }
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });