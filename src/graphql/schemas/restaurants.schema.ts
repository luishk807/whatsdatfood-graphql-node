import { gql } from 'graphql-tag';
import db from 'db/models';
export const restaurantDefs = gql`
  type RestaurantMenuItems {
    id: ID!
    retaurant_id: ID!
    name: String
    description: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurant: Restaurant
    images: [RestaurantMenuItemImages]
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
    url: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurantItem: RestaurantMenuItems
  }

  type RestaurantMenuItemsAIResponse {
    name: String
    category: String
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
    created_at: String
    updated_at: String
    deleted_at: String
    restaurant_id: ID!
  }

  extend type Query {
    restaurants: [Restaurant]
    restaurantBySlug(slug: String): Restaurant
    restaurantByName(name: String): [Restaurant]
    aiRestaurant(name: String): [RestaurantAIResponse]
    # aiRestaurantBySlug(slug: String): [RestaurantAIResponse]
  }

  extend type Mutation {
    addRestaurant(input: createRestauranInput): Restaurant
    addRestaurantItems(input: createRestauranItemsInput): RestaurantMenuItems
  }
`;
