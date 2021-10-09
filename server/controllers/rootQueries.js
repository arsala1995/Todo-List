
const jwt = require('jsonwebtoken')
const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLList,
  GraphQLString,
  } = require('graphql');

const {Todos, Users} = require('../db/index');
const {TodoType, UserType, AuthDataType} = require('./schemaType');

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
        name: { type: GraphQLString }
      },
      resolve: (parent, args) => Todos.find(item => item.name === args.name)
    },
    user: {
      type: UserType,
      description: 'A single user',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => Users.find(user => user.id === args.id)
    },
    login: {
      type: AuthDataType,
      description: 'User login',
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: (parent, args) => {
       const user = Users.find(user => user.name === args.name);
       if (!user) {
         throw new Error('User does not exist!');
       }
       if (user.password !== args.password) {
        throw new Error('Password is incorrect!');
       }

       const token = jwt.sign({userId: user.id, name: user.name}, 'somesupersecretkey')

       return { userId: user.id, token: token }
      }

    },
  })
})

module.exports = {RootQueryType}