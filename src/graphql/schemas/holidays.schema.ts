import { gql } from 'graphql-tag';
export const holidayDef = gql`
  scalar DateTime
  scalar Date
  type Holiday {
    id: ID
    status_id: ID
    name: String
    date_assigned: Date
    createdAt: DateTime
    updatedAt: DateTime
    status: Status
    user: User
  }
`;
