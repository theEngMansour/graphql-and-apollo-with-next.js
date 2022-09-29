import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
    }

    type Book {
        id: ID!
        title: String!
    }

    union SearchResult = Book | Author

    type Query {
        search(contains: String!): [SearchResult]
    }
`