const { 
  GraphQLObjectType, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLString, 
} = require('graphql');

//Todo list type representing the Todo items that consists of id, name, ownerid and the description
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

//User type representing the Users that consists of id, name, and password for users
const UserType = new GraphQLObjectType({
  name: 'Users',
  description: 'This represents user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  })
})

//Type for authenticating user that will hold token and userId for the user logging in
const AuthDataType = new GraphQLObjectType({
  name: 'Authentication',
  description: 'This authenticates user',
  fields: () => ({
    userId: { type: GraphQLNonNull(GraphQLInt) },
    token: { type: GraphQLNonNull(GraphQLString) },
  })
})

module.exports = { TodoType, UserType, AuthDataType }