import express, { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client';
import { resolvers as allResolvers } from '../resolvers';
import { projectsTypeDefs } from '../type-defs'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import cors from 'cors';
import AppRouter from '../routes/app.route'

const prisma = new PrismaClient({
  errorFormat: 'minimal'
});

const resolvers = { Query: { ...allResolvers } };
const typeDefs = projectsTypeDefs;

export async function createAppServer() {
  const app: Application = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start();
  app.use(express.json());

  // Graphql Entry point
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        prisma: prisma,
      }),
    })
  )

  app.use('/api/', AppRouter);

  return {
    app,
    httpServer
  };

}