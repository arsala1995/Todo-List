const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const {RootMutationType} = require('./controllers/mutationQueries');
const {RootQueryType} = require('./controllers/rootQueries');
const { isAuth } = require('./middleware/is-auth')

const app = express()
const port = 8000;

//We need to create schema for our queries and mutations
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

//running authentication for the user to make sure the token exists for logged in user.
app.use(isAuth);

//default route to perform queries and mutations.
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})