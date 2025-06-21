import app from './app';
import config from './config/config';
import { initDB } from './db';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

interface MyContext {
  userId?: string;
  // add more as needed
}

async function startApolloServer() {

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();
  // graphqlServer.applyMiddleware({ app, path: '/graphql' });


  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }): Promise<MyContext> => {
        const token = req.headers.authorization || '';
        return { userId: token || 'mock-user-id' };
      },
    }),
  );

  app.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
initDB().then(startApolloServer);
