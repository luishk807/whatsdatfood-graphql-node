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
    friends: [UserFriends]
  }

  type UserFavorites {
    id: ID
    user_id: ID
    restaurant_id: ID
    createdAt: DateTime
    updatedAt: DateTime
    user: User
    restaurant: Restaurant
  }

  type UserFriends {
    id: ID
    name: String
    email: String
    phone: String
    createdAt: DateTime
    updatedAt: DateTime
    user_id: ID
    user: User
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

  input CreateUserFriendsInput {
    name: String!
    email: String
    phone: String
    user_id: ID!
  }

  input UpdateUserRatingInput {
    id: ID!
    user_id: ID!
    title: String
    comment: String
    restaurant_menu_item_id: ID!
    rating: Float
  }

  input UpdateUserFriendsInput {
    id: ID!
    name: String
    email: String
    phone: String
    user_id: ID!
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

  type AllRatingByItemResponse {
    data: [UserRating]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  type AllFavoritesByUserResponse {
    data: [UserFavorites]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }
  type AllFriendsByUserResponse {
    data: [UserFriends]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  extend type Query {
    users: [User]
    user(id: ID): User
    userDetail: User
    getUserByEmail(email: String): User
    getUserByUsername(username: String): User
    getUserFavoritesByUser(page: Int, limit: Int): AllFavoritesByUserResponse
    getRatingByRestItemId(restItemId: ID): UserRating
    getFriendsByUser(page: Int, limit: Int): AllFriendsByUserResponse
    checkUserFavoriteBySlug(slug: String!): Boolean
    ratings: [UserRating]
    checkUsername(username: String): Boolean
    allRatingsByItemId(
      restItemId: ID!
      page: Int!
      limit: Int
    ): AllRatingByItemResponse
  }

  extend type Mutation {
    addUser(input: CreateUserInput): User
    addUserRating(input: CreateUserRatingInput): UserRating
    addUserSearches(input: CreateUserSearchInput): UserSearch
    addUserFavorites(input: CreateUserFavoritesInput): UserFavorites
    addUserFriend(input: CreateUserFriendsInput): UserFriends
    updateUserRating(input: UpdateUserRatingInput): UserRating
    updateUserFriend(input: UpdateUserFriendsInput): UserFriends
    updateUser(input: UpdateUserInput): User
    deleteUserRating(id: ID): Boolean
    deleteUserFavorites(id: ID): Boolean
    deleteUserFriend(id: ID): Boolean
  }

  extend type Subscription {
    userAdded: User
  }
`;
