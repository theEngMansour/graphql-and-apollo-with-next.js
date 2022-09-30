const express = require('express')
const next = require('next')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { createServer } = require('http')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = createServer(app)

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const servers = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
              return {
                async drainServer() {
                    serverCleanup.close()
                }
              }
            }
        }
    ]
  })
  
  await servers.start()
  servers.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${servers.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)