require('dotenv').config();
import express from "express"
import { ApolloServer} from "apollo-server-express";
import {resolvers,typeDefs} from "./schema";
import {getUser} from "./users/users.utils"

const PORT = process.env.PORT

const server = new ApolloServer({
  resolvers,typeDefs,
  context: async ({req}) =>{
    return{
      loggedInUser : await getUser(req.headers.authorization),
    }
  }
});
const app = express();
app.use('/static', express.static("uploads"))
server.applyMiddleware({app});

app.listen({port: PORT},() => console.log(`🚄graphQL playground is on http://localhost:${PORT}/graphql\n🚀Server is running on http://localhost:${PORT}/`));