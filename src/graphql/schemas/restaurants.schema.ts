import { gql } from 'graphql-tag';
import db from 'db/models';
export const restaurantDefs = gql`
  scalar DateTime

  type Restaurant {
    id: ID
    name: String
    slug: String
    address: String
    city: String
    state: String
    country: String
    postal_code: String
    phone: String
    payment_method: String
    rating: Float
    email: String
    michelin_score: Int
    description: String
    delivery_method: String
    letter_grade: String
    tasting_menu_only: Boolean
    tasting_menu_price: Float
    reservation_required: Boolean
    reservation_available: Boolean
    price_range: String
    website: String
    drink_pairing_price: Float
    restaurantMenuItems: [RestaurantMenuItem]
    businessHours: [RestaurantBusinessHours]
  }

  type RestaurantBusinessHours {
    id: ID
    restaurant_id: ID
    day_of_week: String
    open_time: String
    close_time: String
  }

  type RestaurantMenuItem {
    id: ID
    restaurant_id: ID
    name: String
    price: Float
    top_choice: Boolean
    description: String
    category: String
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    images: [RestaurantMenuItemImages]
    ratings: [UserRating]
    restaurant: Restaurant
  }

  type RestaurantMenuItemImages {
    id: ID
    restaurant_item_id: ID
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
    restaurantMenuItem: RestaurantMenuItem
  }

  input createRestauranInput {
    name: String!
    slug: String
    address: String
    city: String
    state: String
    country: String
    postal_code: String
    phone: String
    payment_method: String
    rating: Float
    michelin_score: Int
    description: String
    website: String
    delivery_method: String
    letter_grade: String
    tasting_menu_only: Boolean
    tasting_menu_price: Float
    reservation_required: Boolean
    reservation_available: Boolean
    price_range: String
    drink_pairing_price: Float
  }

  input createRestaurantMenuItemsInput {
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
    aiRestaurantBySlug(slug: String): Restaurant
    aiRestaurantNameList(name: String): [Restaurant]
    getRestaurantImage(id: ID): RestaurantMenuItemImages
  }

  extend type Mutation {
    addRestaurant(input: createRestauranInput): Restaurant
    addRestaurantItems(
      input: createRestaurantMenuItemsInput
    ): RestaurantMenuItem
  }
`;
