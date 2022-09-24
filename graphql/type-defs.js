import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type User {
    id: ID!
    name: String! @upper
    email: String!
    mobile: String! @deprecated(reason: "use email instead from mobile")
    age: Int!
    isGraduated: Boolean
    image: Image
    cumulativeGPA: Float!
    gender: Gender!
    friends(cumulativeGPA: Float = 50.0  @deprecated): [Friend!]!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Friend {
    name: String! @upper
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