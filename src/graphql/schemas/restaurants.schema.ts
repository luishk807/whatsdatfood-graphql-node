import { gql } from 'graphql-tag';
import db from 'db/models';
export const restaurantDefs = gql`
  scalar DateTime
  type RestaurantMenuItems {
    id: ID!
    restaurant_id: ID!
    name: String
    price: Float
    top_choice: Boolean
    description: String
    category: String
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    restaurantItemRest: Restaurant
    restaurantItemRestImages: [RestaurantMenuItemImages]
    restaurantItemUserRatings: [UserRatings]
  }

  type Restaurant {
    id: ID!
    name: String!
    slug: String
    address: String
    city: String
    state: String
    country: String
    postal_code: String
    restRestaurantItems: [RestaurantMenuItems]
  }

  type RestaurantMenuItemImages {
    id: ID!
    restaurant_item_id: ID!
    user_id: ID
    name: String
    url_m: String
    url_s: String
    owner: String
    license: String
    category: String
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    restaurantItemImageRestItem: RestaurantMenuItems
  }

  type RestaurantMenuItemsAIResponse {
    name: String
    category: String
    top_choice: Boolean
    description: String
    restaurantItemImages: [RestaurantMenuItemImages]
    restaurantItemUserRatings: [UserRatings]
  }

  type RestaurantAIResponse {
    name: String!
    address: String!
    city: String!
    slug: String
    state: String!
    country: String!
    postal_code: String!
    restRestaurantItems: [RestaurantMenuItems]
  }

  input createRestauranInput {
    name: String!
    slug: String
    address: String
    city: String
    state: String
    country: String
    postal_code: String
  }

  input createRestaurantItemsInput {
    name: String!
    url: String
    category: String
    price: Float
    top_choice: Boolean
    created_at: String
    updated_at: String
    deleted_at: String
    restaurant_id: ID!
  }

  extend type Query {
    restaurants: [Restaurant]
    aiRestaurantBySlug(slug: String): RestaurantAIResponse
    aiRestaurantNameList(name: String): [RestaurantAIResponse]
    getRestaurantImage(id: ID): RestaurantMenuItemImages
  }

  extend type Mutation {
    addRestaurant(input: createRestauranInput): Restaurant
    addRestaurantItems(input: createRestaurantItemsInput): RestaurantMenuItems
  }
`;
