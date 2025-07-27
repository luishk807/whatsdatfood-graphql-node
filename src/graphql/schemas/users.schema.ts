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
    dob: Date
    searches: [UserSearch]
    ratings: [UserRating]
    favorites: [UserFavorites]
    status: Status
    role: UserRole
  }

  type UserFavorites {
    id: ID
    user_id: ID
    restaurant_id: ID
    user: User
    restaurant: Restaurant
  }

  type UserRating {
    id: ID
    rating: Float
    user_id: ID
    comment: String
    title: String
    createdAt: DateTime
    updatedAt: DateTime
    status_id: ID
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

  input CreateUserSearchInput {
    user_id: ID!
    restaurant_id: ID!
  }

  input CreateUserFavoritesInput {
    slug: String!
  }

  input CreateUserRatingInput {
    id: ID
    user_id: ID!
    title: String
    restaurant_menu_item_id: ID!
    rating: Float
    comment: String
  }
  input UpdateUserRatingInput {
    id: ID!
    user_id: ID!
    title: String
    comment: String
    restaurant_menu_item_id: ID!
    rating: Float
  }

  input UpdateUserInput {
    id: ID!
    first_name: String
    last_name: String
    password: String
    username: String
    phone: String
    role: ID
    email: String
    dob: String
  }

  extend type Query {
    users: [User]
    user(id: ID): User
    getUserByEmail(email: String): User
    getUserByUsername(username: String): User
    getRatingByRestItemId(restItemId: ID): UserRating
    ratings: [UserRating]
    checkUsername(username: String): Boolean
  }

  extend type Mutation {
    addUser(input: CreateUserInput): User
    addUserRating(input: CreateUserRatingInput): UserRating
    updateUserRating(input: UpdateUserRatingInput): UserRating
    updateUser(input: UpdateUserInput): User
    deleteUserRating(id: ID): Boolean
    addUserSearches(input: CreateUserSearchInput): UserSearch
    addUserFavorites(input: CreateUserFavoritesInput): UserFavorites
    deleteUserFavorites(id: ID): Boolean
  }

  extend type Subscription {
    userAdded: User
  }
`;
