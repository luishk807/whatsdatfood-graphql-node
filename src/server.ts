import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

import app from './app';
import config from 'config/config';
import { initDB } from 'db';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { resolvers } from 'graphql/resolvers';
import { typeDefs } from 'graphql/typeDefs';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLServerContext } from 'interfaces';
import DataLoader from 'dataloader';
import RestaurantMenuItems from 'services/restaurantMenuItems.service';
import RestaurantServices from 'services/restaurants.service';
import OpenAiResturant from 'services/openAi.service';
import { authenticate } from 'helpers/login';

async function startApolloServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer<GraphQLServerContext>({
    schema,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  // graphqlServer.applyMiddleware({ app, path: '/graphql' });

  // 2. Create an HTTP server from Express app
  const httpServer = http.createServer(app);

  // 3. Create WebSocket server for handling subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // 4. Integrate graphql-ws with the WebSocket server and your schema
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: any, msg: any, args: any) => {
        // Optionally, you can build context for subscriptions here
        // e.g., authentication or dataloaders (if needed)
        return {
          user: null,
          // You can share dataloaders here too if you want
        };
      },
    },
    wsServer,
  );

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLServerContext> => {
        //const userData = authenticate(req);

        const restaurantRestaurantItemsDataLoader = new DataLoader(
          (ids: readonly number[]) =>
            Promise.all(
              ids.map((id) => RestaurantMenuItems.findItemsByRestaurantId(id)),
            ),
        );

        const restaurantItemRestaurant = new DataLoader(
          (ids: readonly number[]) =>
            Promise.all(ids.map((id) => RestaurantServices.findById(id))),
        );

        const aiRestaurantNameListData = new DataLoader(
          (names: readonly string[]) =>
            Promise.all(
              names.map((name) => OpenAiResturant.getAIRestaurantList(name)),
            ),
        );

        const aiRestaurantDataBySlugData = new DataLoader(
          (slugs: readonly string[]) =>
            Promise.all(
              slugs.map((slug) =>
                OpenAiResturant.getAIRestaurantMenuBySlug(slug),
              ),
            ),
        );

        return {
          // user: userData,
          user: null,
          restaurantRestaurantItemsDataLoader,
          restaurantItemRestaurant,
          aiRestaurantNameList: aiRestaurantNameListData,
          aiRestaurantDataBySlug: aiRestaurantDataBySlugData,
        };
      },
    }),
  );

  app.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
initDB().then(startApolloServer);
