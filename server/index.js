const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const { 
GraphQLObjectType, 
GraphQLNonNull, 
GraphQLInt, 
GraphQLString, 
GraphQLList,
GraphQLSchema
} = require('graphql');

const app = express()
const port = 8000;

const Todos = [
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
  name: 'Todos',
  description: 'This represents a todo list made by the user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    ownerId: { type: GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLNonNull(GraphQLString) },
  })
})

const UserType = new GraphQLObjectType({
  name: 'Users',
  description: 'This represents user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      description: 'List of all todos',
      resolve: () => Todos
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'List of all todos',
      resolve: () => Users
    },
    todo: {
      type: TodoType,
      description: 'A single todo item',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => Todos.find(item => item.id === args.id)
    },
    user: {
      type: UserType,
      description: 'A single user',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => Users.find(user => user.id === args.id)
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})