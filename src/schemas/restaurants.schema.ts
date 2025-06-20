export const typeDefs = `#graphql
    type Restaurants {
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
        restaurant_id: bigint!
        name: Text
        url: Text
        category: String
        created_at: Date
        updated_at: Date
        deleted_at: Date
    }
    type RestaurantMenuItemImages {
        id: ID!
        restaurant_menu_id: Int!
        name: String
        description: String
        category: String
        created_at: Date
        updated_at: Date
        deleted_at: Date
    }
`;
