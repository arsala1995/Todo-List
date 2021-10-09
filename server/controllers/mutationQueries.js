const { 
  GraphQLObjectType, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLString, 
} = require('graphql');

const {Todos, Users} = require('../db/index');
const {TodoType, UserType} = require('./schemaType');

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
      resolve: (parent, args, req) => {
        if(!req.isAuth) {
          throw new Error(' You are not Unauthenticated!')
        }
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
      resolve: (parent, args, req) => {
        if(!req.isAuth) {
          throw new Error(' You are not Unauthenticated!')
        }
        Todos = Todos.filter(item => item.id !== args.id)
        return Todos[args.id]
      }
    },
    
    addUser: {
      type: UserType,
      description: 'Add a user',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const user = { id: Users.length + 1, name: args.name, password: args.password }
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
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        Users[args.id - 1].name = args.name;
        Users[args.id - 1].password = args.password
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
      resolve: (parent, args, req) => {
        if(!req.isAuth) {
          throw new Error(' You are not Unauthenticated!')
        }
        Todos[args.id - 1].name = args.name
        Todos[args.id - 1].description = args.description
        return Todos[args.id - 1]
      }
    },
  })
})

module.exports = {RootMutationType}