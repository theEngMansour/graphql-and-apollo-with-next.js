
const authors  = [
    {id: 10, name: "Robin Wieruch"},
    {id: 12, name: "Samer Buna"},
    {id: 24, name: "William Lyon"},
    {id: 27, name: "B. G. Preston"}
 ]
 
 const books  = [
    {id: 27, title: "Road To Graphql"},
    {id: 29, title: "Graphql In Action"},
    {id: 30, title: "Full Stack Graphql Applications"},
    {id: 32, title: "Lyon France"}
 ]

 export const resolvers = {
    Query: {
        search: (_, { contains }) => {
            let authors_result = authors.filter(
                author => author.name.toLocaleLowerCase().includes(contains.toLocaleLowerCase())
            )
            let books_result = books.filter(
                book => book.title.toLocaleLowerCase().includes(contains.toLocaleLowerCase())
            )
            return authors_result.concat(books_result)
        }
    },
    SearchResult: {
        __resolveType(parent, args, context, info){
            if(parent.name) return 'Author'
            if(parent.title) return 'Book'
            return null
        }
    }
 } 