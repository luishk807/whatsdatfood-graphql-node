import { gql } from 'graphql-tag';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { restaurantDefs } from './schemas/restaurants.schema';
import { userDefs } from './schemas/users.schema';
import { statusDefs } from './schemas/statuses.schema';
import { loginDef } from './schemas/login.schema';

const baseTypeDefs = gql`
  type Query
  type Mutation
  type Subscription
`;

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  restaurantDefs,
  userDefs,
  statusDefs,
  loginDef,
]);
