const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()
const port = 8000;

const todo = [
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

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})