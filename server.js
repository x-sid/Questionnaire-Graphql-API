const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { createTestClient } = require("apollo-server-testing");
const db = require("./src/database/models/index.js");
const { GraphQLError } = require("graphql");
const {
  InternalErrorResponse,
  BadRequestResponse,
} = require("./src/core/errorHandler");
const path = require("path");

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "/src/typeDefs"))
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "/src/resolvers"))
);

const app = express();
const port = process.env.PORT || 4000;
const baseUrl = "/graphql";
let server;

const startServer = async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return { req, db, port, baseUrl, GraphQLError };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: baseUrl });
  app.get("/", (req, res) => res.send("Hello World"));
  app.listen({ port }, () =>
    console.log(`Server running at http://localhost:${port}${baseUrl}`)
  );
};

startServer();

module.exports = {
  testClient: createTestClient(server),
};
