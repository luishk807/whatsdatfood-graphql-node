import { gql } from 'graphql-tag';
export const userDefs = gql`
  scalar DateTime
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
    dob: String!
    userUserSearches: [UserSearches]
    userUserRatings: [UserRatings]
    userStatus: Status
    userUserRole: UserRole
  }

  type UserRatings {
    id: ID!
    rating: Float
    user_id: ID!
    comment: String
    createdAt: DateTime
    updatedAt: DateTime
    restaurant_menu_item_id: ID!
    user: [User]
    userRatingRestaurantItem: RestaurantMenuItems
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
    restaurant_menu_item_id: ID!
    rating: Float
    comment: String
  }
  input updateUserRatingInput {
    id: ID!
    user_id: ID!
    restaurant_menu_item_id: ID!
    rating: Float
  }

  extend type Query {
    users: [User]
    user(id: ID): User
    getUserByEmail(email: String): User
    getUserByUsername(username: String): User
    ratings: [UserRatings]
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
