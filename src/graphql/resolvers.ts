import { mergeResolvers } from '@graphql-tools/merge';
import { restaurantResolvers } from './resolvers/restaurant.resolver';
import { userResolvers } from './resolvers/user.resolver';

export const resolvers = mergeResolvers([restaurantResolvers, userResolvers]);
