const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const { 
GraphQLObjectType, 
GraphQLNonNull, 
GraphQLInt, 
GraphQLString 
} = require('graphql');

const app = express()
const port = 8000;

const Todo = [
  {
    id: 1,
    name: 'Hiking',
    ownerId: 1,
    description: 'Capilano Hills'
  },
  {
    id: 2,
    name: 'Biking',
    ownerId: 2,
    description: 'Canada Place'
  },
  {
    id: 3,
    name: 'Coffee',
    ownerId: 3,
    description: 'Starbucks'
  },
  {
    id: 4,
    name: 'Picnic',
    ownerId: 4,
    description: 'Sasamat Lake'
  }
]

const Users = [
  {
    id: 1,
    name: 'David Beckham' 
  },
  {
    id: 2,
    name: 'Michael Jordan' 
  },
  {
    id: 3,
    name: 'Justin Trudeau' 
  },
  {
    id: 4,
    name: 'Sher Arsalaie' 
  },
]

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'This represents a todo list made by the user',
  field: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    ownerId: { type: GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLNonNull(GraphQLString) },
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user',
  field: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  })
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})