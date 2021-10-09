const { 
  GraphQLObjectType, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLString, 
  } = require('graphql');


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
    password: { type: GraphQLNonNull(GraphQLString) },
  })
})

const AuthDataType = new GraphQLObjectType({
  name: 'Authentication',
  description: 'This authenticates user',
  fields: () => ({
    userId: { type: GraphQLNonNull(GraphQLInt) },
    token: { type: GraphQLNonNull(GraphQLString) },
  })
})

module.exports = {TodoType, UserType, AuthDataType}