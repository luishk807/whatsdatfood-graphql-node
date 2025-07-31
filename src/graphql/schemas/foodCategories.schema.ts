import { gql } from 'graphql-tag';
export const foodCategoriesDef = gql`
  scalar DateTime
  type FoodCategory {
    id: ID
    status_id: ID
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    status: Status
  }
`;
