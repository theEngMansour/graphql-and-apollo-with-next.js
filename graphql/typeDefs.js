const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        gender: Gender!
        mobile: String!
        cumulativeGPA:Float!
        isGraduated: Boolean
        friends: [Friend]!
        age: Int!
        image: Image
    }

    enum Gender {
        MALE
        FEMALE
    }

    type Friend{
        name: String!
        email: String!
        gender: Gender!
        mobile: String!
        cumulativeGPA:Float!
    }

    type Image{
        name: String!
        height: Int!
        width: Int!
    }

    type Query {
        users: [User]
        getUserByID(id: ID!): User
    }

    type Mutation {
        createUser(
            name: String!
            email: String!
            gender: Gender!
            mobile: String!
            cumulativeGPA:Float!
            isGraduated: Boolean
            friends: [FriendInput]!
            age: Int!
            image: ImageInput
        ): User
    }

    type Subscription {
        userAdded: User
    }

    input ImageInput{
        name: String!
        height: Int!
        width: Int!
    }

    input FriendInput{
        name: String!
        email: String!
        gender: Gender!
        mobile: String!
        cumulativeGPA:Float!
    }

`

module.exports = { typeDefs }

