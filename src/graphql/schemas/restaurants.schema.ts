import { gql } from 'graphql-tag';
import db from 'db/models';
export const restaurantDefs = gql`
  type RestaurantMenuItems {
    id: ID!
    retaurant_id: ID!
    name: String
    price: Float
    top_choice: Boolean
    description: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurantItemRest: Restaurant
    restaurantItemRestImages: [RestaurantMenuItemImages]
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
    name: String
    url_m: String
    url_s: String
    owner: String
    license: String
    flickr_id: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurantItemImageRestItem: RestaurantMenuItems
  }

  type RestaurantMenuItemsAIResponse {
    name: String
    category: String
    top_choice: Boolean
    description: String
    images: [RestaurantMenuItemImages]
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

  input createRestauranItemsInput {
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
  }

  extend type Mutation {
    addRestaurant(input: createRestauranInput): Restaurant
    addRestaurantItems(input: createRestauranItemsInput): RestaurantMenuItems
  }
`;
