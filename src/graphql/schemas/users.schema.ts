import { gql } from 'graphql-tag';
export const userDefs = gql`
  scalar DateTime
  scalar Date
  type User {
    id: ID
    first_name: String
    last_name: String
    password: String
    phone: String
    email: String
    username: String
    verification: String
    status_id: ID
    role_id: ID
    createdAt: DateTime
    updatedAt: DateTime
    dob: DateTime
    searches: [UserSearch]
    ratings: [UserRating]
    status: Status
    role: UserRole
  }

  type UserRating {
    id: ID
    rating: Float
    user_id: ID
    comment: String
    title: String
    createdAt: DateTime
    updatedAt: DateTime
    restaurant_menu_item_id: ID
    user: User
    status: Status
    restaurantMenuItem: RestaurantMenuItem
  }

  type Subscription {
    userAdded: User
  }

  type UserRole {
    id: ID!
    name: String
  }

  type UserSearch {
    id: ID!
    user_id: ID
    restaurant_id: ID!
    user: User
    restaurant: Restaurant
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    searches: Restaurant
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    password: String!
    username: String!
    phone: String!
    role: ID
    email: String!
    dob: String!
  }

  input createUserSearchInput {
    user_id: ID!
    restaurant_id: ID!
  }

  input createUserRatingInput {
    user_id: ID!
    title: String
    restaurant_menu_item_id: ID!
    rating: Float
    comment: String
  }
  input updateUserRatingInput {
    id: ID!
    user_id: ID!
    title: String
    comment: String
    restaurant_menu_item_id: ID!
    rating: Float
  }

  extend type Query {
    users: [User]
    user(id: ID): User
    getUserByEmail(email: String): User
    getUserByUsername(username: String): User
    ratings: [UserRating]
    checkUsername(username: String): Boolean
  }

  extend type Mutation {
    addUser(input: CreateUserInput): User
    addUserRating(input: createUserRatingInput): UserRating
    updateUserRating(input: updateUserRatingInput): UserRating
    deleteUserRating(id: ID): Boolean
    addUserSearches(input: createUserSearchInput): UserSearch
  }

  extend type Subscription {
    userAdded: User
  }
`;
