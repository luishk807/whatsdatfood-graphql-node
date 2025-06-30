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
import OpenAiResturant from 'services/openAi.service';
import { authenticate } from 'helpers/login';
import { GraphQLError } from 'graphql';
import {
  RestaurantType,
  RestaurantItemType,
  UserType,
  ResturantAIResponse,
} from 'types';
interface MyContext {
  user: UserType | null;
  restaurantRestaurantItemsDataLoader: DataLoader<number, RestaurantItemType[]>;
  restaurantItemRestaurant: DataLoader<number, RestaurantType | null>;
  aiRestaurant: DataLoader<string, ResturantAIResponse[] | []>;
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

        const aiRestaurantData = new DataLoader((names: readonly string[]) =>
          Promise.all(
            names.map((name) => OpenAiResturant.getAIRestaurantList(name)),
          ),
        );

        return {
          // user: userData,
          user: null,
          restaurantRestaurantItemsDataLoader,
          restaurantItemRestaurant,
          aiRestaurant: aiRestaurantData,
        };
      },
    }),
  );

  app.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
initDB().then(startApolloServer);
