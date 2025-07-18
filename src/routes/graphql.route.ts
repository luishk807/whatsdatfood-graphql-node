import http from 'http';
import { Application } from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

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

export async function setupGraphQL(app: Application, httpServer: http.Server) {
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

  app.use('/graphql', (req, res, next) => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
    next();
  });

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLServerContext> => {
        // const userData = authenticate(req);

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
          req,
          res,
          user: null,
          restaurantRestaurantItemsDataLoader,
          restaurantItemRestaurant,
          aiRestaurantNameList: aiRestaurantNameListData,
          aiRestaurantDataBySlug: aiRestaurantDataBySlugData,
        };
      },
    }),
  );
}
