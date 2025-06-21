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
  }

  type RestaurantMenuItems {
    id: ID!
    restaurant_id: Int!
    name: String
    url: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
  }
  type RestaurantMenuItemImages {
    id: ID!
    restaurant_menu_id: Int!
    name: String
    description: String
    category: String
    created_at: String
    updated_at: String
    deleted_at: String
  }

  extend type Query {
    restaurants: [Restaurant]
    restaurantBySlug(slug: String): Restaurant
    restaurantByName(name: String): [Restaurant]
  }

  extend type Mutation {
    restaurantCreate(
      name: String!
      slug: String!
      address: String
      city: String
      state: String
      country: String
      postal_code: String
    ): Restaurant
  }
`;
