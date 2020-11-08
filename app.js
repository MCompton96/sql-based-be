const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));

app.listen(3001, () => {
    console.log('Listening on port 3001')
})