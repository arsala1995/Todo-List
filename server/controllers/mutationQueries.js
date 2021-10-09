const { Todos, Users } = require('../db/index');
const { TodoType, UserType } = require('./schemaType');
const { 
  GraphQLObjectType, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLString, 
} = require('graphql');


//Root mutation that will allow user to add, delete and update users or todo list
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({

    //Logged in user will be able to create a new todo list
    addTodo: {
      type: TodoType,
      description: 'Add a todo item',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, req) => {

        //We check for the user authentication to know whether the user is logged in and has token.
        if(!req.isAuth) {
          throw new Error(' You are not Unauthenticated!')
        }
        const todo = { id: Todos.length + 1, name: args.name, ownerId: req.userId, description: args.description}
        Todos.push(todo)
        return todo
      }
    },
    
    //logged in user and the owner of a certain todo item will be able to remove the item.
    removeTodo: {
      type: TodoType,
      description: 'Remove a todo item',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        ownerId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args, req) => {

        //authenticating and making sure the logged in user is the owner of item to delete
        if(!req.isAuth || (req.userId !== args.ownerId)) {
          throw new Error(' You are not Unauthenticated!')
        }
        Todos = Todos.filter(item => item.id !== args.id)
        return Todos[args.id]
      }
    },
    
    //logged in user and the owner of a certain todo item will be able to update the item.
    updateTodo: {
      type: TodoType,
      description: 'Update a todo item',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        ownerId: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, req) => {
        
        //authenticating and making sure the logged in user is the owner of item to delete
        if(!req.isAuth || (req.userId !== args.ownerId)) {
          throw new Error(' You are not Unauthenticated!')
        }
        Todos[args.id - 1].name = args.name
        Todos[args.id - 1].description = args.description
        return Todos[args.id - 1]
      }
    },
    
    //creating new user
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

    //removing a user 
    removeUser: {
      type: UserType,
      description: 'Remove a user',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        ownerId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        Users = Users.filter(user => user.id !== args.ownerId)
        return Users[args.id]
      }
    },

    //updating a user
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
    }
  })
})

module.exports = { RootMutationType }