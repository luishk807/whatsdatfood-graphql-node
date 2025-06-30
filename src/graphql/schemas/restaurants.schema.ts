import { gql } from 'graphql-tag';
export const restaurantDefs = gql`
  type Restaurant {
    id: ID!
    name: String!
    slug: String!
    address: String
    city: String
    state: String
    country: String
    postal_code: String
    items: [RestaurantMenuItems]
  }

  type RestaurantMenuItems {
    id: ID!
    retaurant_id: ID!
    name: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurant: Restaurant
    images: [RestaurantMenuItemImages]
  }
  type RestaurantMenuItemImages {
    id: ID!
    restaurant_item_id: ID!
    name: String
    url: String
    description: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
    restaurantItem: RestaurantMenuItems
  }

  type ResturantAIResponse {
    name: String!
    address: String!
    city: String!
    state: String!
    country: String!
    postal_code: String!
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
    aiRestaurant(name: String): [ResturantAIResponse]
  }

  extend type Mutation {
    addRestaurant(input: createRestauranInput): Restaurant
    addRestaurantItems(input: createRestauranItemsInput): RestaurantMenuItems
  }
`;
