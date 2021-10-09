const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLList,
  } = require('graphql');

const {Todos, Users} = require('../schema/index');
const {TodoType, UserType} = require('./schemaType');

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

module.exports = {RootQueryType}