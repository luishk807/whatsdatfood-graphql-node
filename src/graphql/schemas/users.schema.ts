import { gql } from 'graphql-tag';
export const userDefs = gql`
  scalar DateTime
  scalar Date
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    password: String!
    phone: String!
    email: String!
    username: String!
    verification: String
    status_id: ID
    role_id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    dob: DateTime!
    userUserSearches: [UserSearches]
    userUserRatings: [UserRatings]
    userStatus: Status
    userUserRole: UserRole
  }

  type UserResponseType {
    id: ID!
    first_name: String!
    last_name: String!
    password: String!
    phone: String!
    email: String!
    username: String!
    verification: String
    status_id: ID
    role_id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    dob: Date
    searches: [UserSearches]
    ratings: [UserRatingResponseType]
    status: Status
    role: UserRole
  }

  type UserRatings {
    id: ID!
    rating: Float
    user_id: ID!
    comment: String
    title: String
    createdAt: DateTime
    updatedAt: DateTime
    restaurant_menu_item_id: ID!
    user: [UserResponseType]
    userRatingRestaurantItem: RestaurantMenuItems
  }

  type UserRatingResponseType {
    id: ID!
    rating: Float
    user_id: ID!
    comment: String
    title: String
    createdAt: DateTime
    updatedAt: DateTime
    restaurant_menu_item_id: ID!
    user: [UserResponseType]
    restaurantItem: RestaurantMenuItemsResponseType
  }

  type Subscription {
    userAdded: User
  }

  type UserRole {
    id: ID!
    name: String
  }

  type UserSearches {
    id: ID!
    user_id: ID!
    restaurant_id: ID!
    user: User
    restaurant: Restaurant
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    userSearchesRestaurant: Restaurant
    userSearchesUser: User
  }

  type UserSearchesResponseType {
    id: ID!
    user_id: ID!
    restaurant_id: ID!
    user: UserResponseType
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    restaurant: RestaurantResponseType
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
    users: [UserResponseType]
    user(id: ID): UserResponseType
    getUserByEmail(email: String): UserResponseType
    getUserByUsername(username: String): UserResponseType
    ratings: [UserRatingResponseType]
    checkUsername(username: String): Boolean
  }

  extend type Mutation {
    addUser(input: CreateUserInput): User
    addUserRating(input: createUserRatingInput): UserRatings
    updateUserRating(input: updateUserRatingInput): UserRatings
    deleteUserRating(id: ID): Boolean
    addUserSearches(input: createUserSearchInput): UserSearches
  }

  extend type Subscription {
    userAdded: User
  }
`;
