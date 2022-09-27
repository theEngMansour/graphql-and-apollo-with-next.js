import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    interface Student {
        id: ID!
        name: String!
        email: String!
        gender: Gender!
        cumulativeGPA: Float!
        isGraduated: Boolean!
        avater: Avater!
        idea: String
        department: Part!
    }

    type GraduationDate implements Student{
        id: ID!
        name: String!
        email: String!
        gender: Gender!
        cumulativeGPA: Float!
        isGraduated: Boolean!
        avater: Avater!
        idea: String
        department: Part!
        graduationDate: String
    }

    type NonGraduationDate implements Student{
        id: ID!
        name: String!
        email: String!
        gender: Gender!
        cumulativeGPA: Float!
        isGraduated: Boolean!
        avater: Avater!
        idea: String
        department: Part!
    }

    enum Gender {
        MALE
        FEMALE
    }

    enum Part {
        COMMUNICATION
        CIVIL
        ELECTRICAL
    }

    type Avater {
        name: String!
        width: Int!
        height: Int!
    }

    type Query {
        students: [Student]
        graduationDate: [GraduationDate]
        nonGraduationDate: [NonGraduationDate]
    }
`