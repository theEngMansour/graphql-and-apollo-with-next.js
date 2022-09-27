import { ApolloServer, gql } from 'apollo-server-micro';
// import { resolvers } from 'graphql/resolvers';
// import { typeDefs } from 'graphql/type-defs';
import { upperDirectiveTransformer } from 'directives/uppercase';
import { makeExecutableSchema } from '@graphql-tools/schema';
import micro_cors from 'micro-cors';

import { typeDefs } from 'graphql/typeDefsUnion'
import { resolvers } from 'graphql/resoversUnion'

const cors = micro_cors({
  origin:"https://studio.apollographql.com", 
  allowMethods:["GET","POST"], 
  allowHeaders:[
    "Access-Control-Allow-Credentials",
    "true","Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers"
  ]
})

// Create the base executable schema
/* let schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Transform the schema by applying directive logic
schema = upperDirectiveTransformer(schema, 'upper');
 */
const apolloServer = new ApolloServer({typeDefs, resolvers})
const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if(req.method == 'OPTIONS') {
    res.end()
    return false
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}