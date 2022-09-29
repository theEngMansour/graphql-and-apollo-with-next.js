import { ApolloServer } from 'apollo-server-micro';
// import { upperDirectiveTransformer } from 'directives/uppercase';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from 'graphql/typeDefs';
import { resolvers } from 'graphql/resolvers';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Disposable } from 'graphql-ws';
import { WebSocketServer } from 'ws';
import micro_cors from 'micro-cors';

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

let serverCleanup = Disposable | null;

let schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/* 
// Transform the schema by applying directive logic
schema = upperDirectiveTransformer(schema, 'upper');
 */
const apolloServer = new ApolloServer({ 
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup?.dispose();
          },
        };
      },
    },
  ]
})

const startServer = apolloServer.start()

const getHandler = async () => {
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  });
}

const wsServer = new WebSocketServer({
  noServer: true
});

export default cors(async function handler(req, res) {
  if(req.method == 'OPTIONS') {
    res.end()
    return false
  }

  res.socket.server.ws = (() => {
    res.socket.server.on('upgrade', function (request, socket, head) {
      wsServer.handleUpgrade(request, socket, head, function (ws) {
        wsServer.emit('connection', ws);
      })
    })
    serverCleanup = useServer({ schema }, wsServer);
    return wsServer;
  })();

  const h = await getHandler();
  await h(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
