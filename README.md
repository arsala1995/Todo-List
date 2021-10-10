# Todo-List

Convergence's technical interview "Todo List" problem.

# Exercise

A user will be able to view a list of all Todo items in database, user will be able to filter the items using name to view certain item. Logged in user will be able to create a new todo list. If the user is logged in and the Item belongs to logged in user he/she will be able to update or remove that item. 
# Rules

- Any user can view todo list. 
- Only logged in user is able to create item.
- logged in user will be only able to update and remove items that belong to that user.
- You can filter items in the todo list using the name of the item.


# Setup

## Node

1. Clone the repo in your terminal

2. Install local dependencies:

```bash
npm install
```

## Run

To run the server:

```bash
$ npm run start
```

This will run the server for you then you can open the browser and go to this link: http://localhost:8000/graphql.


# Queries and Mutations

After going to the link mentioned above you will be able to see the graphQl page where you will be able to perform your queries and mutations. 

Query example:
{
  login(name:"David Beckham", password: "password") {
    userId
    token
  }
}

This will check if this user exists in the database will return new token with the user's Id but if the user doesnot exist or the password is wrong will throw error accordingly.

Mutation example:

mutation {
  addTodo(name:"Biking", description: "Going to Grouse mountain for biking") {
 	id
  name
  ownerId
  description
  }
}

This will return the new item's id, name, ownerId and description that is added to the database by the user. If the user is not logged in the system will throw error as the user needs to be logged in to create a new item.

# Note:

You might not be able to create, update or remove items on Graphql as it requires authentication and needs to remember the user throughout the login session hence, graphql is not able to perform query and mutation at the same time. 

Solution: Download and install Postman in your local machine and create a new post call from postman to  http://localhost:8000/graphql. Write Query to login to the user and copy the token after you get an output from login, save that token in your header in postman that will remember this user as logged in. After that you will be able to perform mutations where you can create, update and delete todo list items.


