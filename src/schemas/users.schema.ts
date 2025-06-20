export const typeDefs = `#graphql
    type Users {
        id: ID!
        name: String!
        slug: String!
        address:String!
        city: String
        state: String
        country: String
        postal_code: String
    }
    type UserSearches {
        id: ID!
        user_id: Int!
        restaurant_id: Int!
        created_at: Date
        updated_at: Date
        deleted_at: Date
    }
`;
