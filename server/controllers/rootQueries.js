
const jwt = require('jsonwebtoken');
const { Todos, Users } = require('../db/testDb');
const { TodoType, UserType, AuthDataType } = require('./schemaType');
const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLList,
  GraphQLString,
} = require('graphql');



//Root Query that will allow user to view multiple users or todolist and will also be able to filter to see a certain user or certain todo item.
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    
    //Users will be able to see all the todo lists in the database
    todos: {
      type: new GraphQLList(TodoType),
      description: 'List of all todos',
      resolve: () => Todos
    },

    //User will be able to view all users in database
    users: {
      type: new GraphQLList(UserType),
      description: 'List of all todos',
      resolve: () => Users
    },

    //User can filter out a single item using the name and view all the details.
    todo: {
      type: TodoType,
      description: 'A single todo item',
      args: {
        name: { type: GraphQLString }
      },
      resolve: (parent, args) => Todos.find(item => item.name === args.name)
    },

    //You will be able to view certain user that is filtered using id.
    user: {
      type: UserType,
      description: 'A single user',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => Users.find(user => user.id === args.id)
    },

    //For authentication of the user and creating a token for a user after authenticating the user name and password.
    login: {
      type: AuthDataType,
      description: 'User login',
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: (parent, args) => {

        //making sure whether user exists in the database
       const user = Users.find(user => user.name === args.name);
       if (!user) {
         throw new Error('User does not exist!');
       }
       if (user.password !== args.password) {
        throw new Error('Password is incorrect!');
       }

       //if user's email and password is correct will be given a token.
       const token = jwt.sign({userId: user.id, name: user.name}, 'somesupersecretkey')

       return { userId: user.id, token: token }
      }

    },
  })
})

module.exports = { RootQueryType }