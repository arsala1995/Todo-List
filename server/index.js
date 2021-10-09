const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const {RootMutationType} = require('./controllers/mutationQueries');
const {RootQueryType} = require('./controllers/rootQueries');
const { isAuth } = require('./middleware/is-auth')

const app = express()
const port = 8000;


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})