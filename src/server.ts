import app from './app';
import config from 'config/config';
import { initDB } from 'db';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { resolvers } from 'graphql/resolvers';
import { typeDefs } from 'graphql/typeDefs';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import DataLoader from 'dataloader';
import RestaurantMenuItems from 'services/restaurantMenuItems.service';
import RestaurantServices from 'services/restaurants.service';
import { RestaurantType, RestaurantItemType } from 'types';
interface MyContext {
  userId?: string;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
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

        return {
          userId: token || 'mock-user-id',
          restaurantRestaurantItemsDataLoader,
          restaurantItemRestaurant,
        };
      },
    }),
  );

  app.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
initDB().then(startApolloServer);
