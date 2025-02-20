const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

dotenv.config();
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(process.env.PORT, () =>
    console.log(`Server running at http://localhost:${process.env.PORT}/graphql`)
  );
}

startServer();
