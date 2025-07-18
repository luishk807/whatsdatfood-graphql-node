import { gql } from 'graphql-tag';
export const loginDef = gql`
  type LoginPayload {
    token: String!
    user: User!
  }
  extend type Mutation {
    login(username: String!, password: String!): LoginPayload
  }
`;
