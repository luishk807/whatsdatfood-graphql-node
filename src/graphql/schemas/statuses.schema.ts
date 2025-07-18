import { gql } from 'graphql-tag';
export const statusDefs = gql`
  type Status {
    id: ID!
    name: String
  }
`;
