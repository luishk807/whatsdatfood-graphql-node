import { gql } from 'graphql-tag';
export const userDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    password: String!
    phone: String!
    email: String!
    verification: String
    role: Int
    dob: String!
    searches: [UserSearches]
  }

  type UserSearches {
    id: ID!
    user_id: ID!
    restaurant_id: ID!
    user: User
    restaurant: Restaurant
    created_at: String
    updated_at: String
    deleted_at: String
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    password: String!
    phone: String!
    role: Int
    email: String!
    dob: String!
  }

  input createUserSearchInput {
    user_id: ID!
    restaurant_id: ID!
  }

  extend type Query {
    users: [User]
    user(id: ID): User
  }

  extend type Mutation {
    login(username: String!, password: String!): User
    addUser(input: CreateUserInput): User
    addUserSearches(input: createUserSearchInput): UserSearches
  }
`;
