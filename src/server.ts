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
  const server = new ApolloServer<GraphQLServerContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();
  // graphqlServer.applyMiddleware({ app, path: '/graphql' });

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

        const aiRestaurantData = new DataLoader((names: readonly string[]) =>
          Promise.all(
            names.map((name) => OpenAiResturant.getAIRestaurantList(name)),
          ),
        );

        const aiRestaurantBySlugData = new DataLoader(
          (slugs: readonly string[]) =>
            Promise.all(
              slugs.map((slug) => OpenAiResturant.getAIRestaurantMenu(slug)),
            ),
        );

        return {
          // user: userData,
          user: null,
          restaurantRestaurantItemsDataLoader,
          restaurantItemRestaurant,
          aiRestaurant: aiRestaurantData,
          // aiRestaurantBySlug: aiRestaurantBySlugData,
        };
      },
    }),
  );

  app.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
initDB().then(startApolloServer);
