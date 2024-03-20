import express from "express"; //npm i express
// npm install @apollo/server graphql
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors"; //npm i cors
import http from "http";

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  //   para API REST
  app.get("/", (req, res) => res.send("Welcome to my GraphQL API!"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: 4000,
      },
      resolve
    )
  );

  console.log("🚀 Server ready at http://localhost:4000/graphql");
}
