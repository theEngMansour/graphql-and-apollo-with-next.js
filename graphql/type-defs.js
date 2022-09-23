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
    friends(cumulativeGPA: Float = 50.0): [Friend!]!
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
    cumulativeGPAs: [Float]
    usersByGender(gender: Gender!): [User]
    userById(id: ID!): User,
    userByName(name: String!): [String]
    usersWithAgeBetween(min: Int!, max: Int!): [String]
    getUsersByFriendsNumber(friendsNumber: Int!): [User]
    getImages(width: Int!, height: Int!): [Image]
    graduatedUsers: [User]
    getUsersByGenderAndCumulativeGPA(gender: Gender!, cumulativeGPA: Float!): [User]
  }
`

/* type Query {
  users: [User]
  usersCount: Int
  cumulativeGPA: [Float]
  males: [User]
  over25YearsOld: [String]
  firstUser: User
  excellentMaleUsers: [User]
  mohammadUsers: [User]
  graduatedUsers: [User]
  hasMore2Friends: [User]
} */