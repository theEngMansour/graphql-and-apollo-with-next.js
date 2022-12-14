// درس الاشتراكات Subscriptions     
let { users } = require('./mock_data')
const { PubSub } = require('graphql-subscriptions')
const pubSub = new PubSub()
const resolvers = {
    Gender: {
      MALE: 'male',
      FEMALE: 'female',
    },
    Query: {
      getUserByID: (_, {id}) => users.find(user => user.id == id),
      users: () => users,
    },
    Mutation: {
      createUser: async (_, args) => {
        if (users.find(user => user.email === args.email)) {
          throw new Error('المستخدم موجود بالفعل')
        }
        const user = { ...args, id: users.length + 1 }
        users = users.concat(user)
        pubSub.publish('USER_ADDED', { userAdded: user })
        return user
      }
    },
    Subscription: {
      userAdded: {
        subscribe: () => pubSub.asyncIterator(['USER_ADDED'])
      }
    }
}

module.exports = { resolvers }