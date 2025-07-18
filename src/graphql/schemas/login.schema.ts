import { gql } from 'graphql-tag';
export const loginDef = gql`
  type LoginPayload {
    success: Boolean
  }

  extend type Mutation {
    login(username: String!, password: String!): LoginPayload
    checkAuth: User
  }
`;
