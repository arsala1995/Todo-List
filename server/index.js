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

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addTodo: {
      type: TodoType,
      description: 'Add a todo item',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        ownerId: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const todo = { id: Todos.length + 1, name: args.name, ownerId: args.ownerId, description: args.description}
        Todos.push(todo)
        return todo
      }
    },
   
    removeTodo: {
      type: TodoType,
      description: 'Remove a todo item',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        Todos = Todos.filter(item => item.id !== args.id)
        return Todos[args.id]
      }
    },
    
    addUser: {
      type: UserType,
      description: 'Add a user',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const user = { id: Users.length + 1, name: args.name }
        Users.push(user)
        return user
      }
    },

    removeUser: {
      type: UserType,
      description: 'Remove a user',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        Users = Users.filter(user => user.id !== args.id)
        return Users[args.id]
      }
    },

    updateUser: {
      type: UserType,
      description: 'Update a user',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        Users[args.id - 1].name = args.name
        return Users[args.id - 1]
      }
    },
    
    updateTodo: {
      type: TodoType,
      description: 'Update a todo item',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        Todos[args.id - 1].name = args.name
        Todos[args.id - 1].description = args.description
        return Todos[args.id - 1]
      }
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})