import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    age: Int!
    isGraduated: Boolean
    image: Image
    cumulativeGPA: Float!
    gender: Gender!
    friends: [Friend!]!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Friend {
    name: String!
    email: String!
    gender: Gender!
    mobile: String
    cumulativeGPA: Float!
  }

  type Image {
    name: String!
    height: Int!
    width: Int!
  }

  type Query {
    users: [User]
    usersCount: Int
    cumulativeGPA: [Float]
    males: [User]
    over25YearsOld: [String]
    firstUser: User
    excellentMaleUsers: [User]
    mohammadUsers: [User]
    graduatedUsers: [User],
    hasMore2Friends: [User]
  }
`
