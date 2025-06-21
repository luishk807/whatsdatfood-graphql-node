import { gql } from 'graphql-tag';
export const userDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    password: String!
    phone: String!
    email: String!
    verification: String!
    dob: String!
  }

  type UserSearches {
    id: ID!
    user_id: Int!
    restaurant_id: Int!
    created_at: String
    updated_at: String
    deleted_at: String
  }

  extend type Query {
    users: [User]
    user(id: ID): User
  }

  extend type Mutation {
    addUser(
      first_name: String!
      last_name: String!
      password: String!
      phone: String!
      email: String!
      verification: String!
      dob: String!
    ): User
  }
`;
