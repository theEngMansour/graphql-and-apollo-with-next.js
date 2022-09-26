import { users } from './mock_data';
export const resolvers = {
  Gender: {
    MALE: "male",
    FEMALE: "female"
  },
  Query: {
    users: () => users,
    usersCount: () => users.length,
    cumulativeGPAs: ()=> users.map(user => user.cumulativeGPA),
    usersByGender: (_, { gender }) => users.filter(user => user.gender == gender),
    userById: (_, { id }) => users.find(user => user.id == id),
    userByName: (_, { name }) => users.filter(user => user.name == name).map(({ name }) => name),
    getUsersByFriendsNumber: (_, { friendsNumber }) => users.filter(user => user.friends.length == friendsNumber),
    graduatedUsers: () => users.filter(user => user.isGraduated),
    usersWithAgeBetween: (_, { min, max }) => users.filter(user => {
      max = max || 60
      return user.age > min && user.age < max
    }).map(({ name }) => name),
    getImages: (_, { width, height }) => {
      const images = users.map(user => user.image)
      return images.filter(i => i.height == height && i.width == width)
    },
    getUsersByGenderAndCumulativeGPA: (_, { gender, cumulativeGPA }) => users.filter(
      user => user.gender == gender && user.cumulativeGPA >= cumulativeGPA
    )
  },
  Mutation : {
    createUser: (_, args) => {
      const check = users.find(user => user.email === args.newUser.email)
      if(check) {
        throw new Error("email is used !")
      }
      const user = {...args.newUser, id: users.length + 1}
      users = users.concat(user)
      console.log(user)
      return user
    },
    addFriend: (_, args) => {
      const user = users.find(user => user.id == args.userId)
      let userFriends = user.friends
      const friend = args.newFriend
      userFriends = userFriends.concat(friend)
      users = users.map(user => user.id == args.userId ? {...user, friends: userFriends} : user)
      return userFriends
    },
    updateUserEmail: (_, args) => {
      if(users.find(user => user.email === args.email)){
        throw new Error("email is used !")
      }
      const user = users.find(user => user.id == args.userId)
      const updatedUser = {...user, email: args.email}
      users = users.map(user => user.id == args.userId ? updatedUser : user)
      return updatedUser
    },
    setImage: (_, args) => {
      const user = users.find(user => user.id == args.userId)
      const updatedUser = { ...user, image: args.imageUpdate}
      users = users.map(user => user.id == args.userId ? updatedUser : user)
      return updatedUser
    },
    setName: (_, args) => {
      const user = users.find(user => user.id == args.userId)
      const updatedUser = { ...user, name: args.newName}
      users = users.map(user => user.id == args.userId ? updatedUser : user)
      return updatedUser
    },
    deleteUser: (_, args) => {
      users = users.filter(user => user.id != args.id)
      return users
    },
    removeFriend: (_, args) => {
      const user = users.find(user => user.id == args.userId)
      let userFriends = user.friends
      userFriends = userFriends.filter(friend => friend.email !== args.friendEmail)
      users = users.map(user => user.id == args.userId ? {...user, friends: userFriends}: user)
      return userFriends
    }
  },
/*   User: {
    friends: (parent, { cumulativeGPA }, context, info) => {
      return parent.friends.filter(
        friend => friend.cumulativeGPA == cumulativeGPA
      )
    }
  } */

/* Query: {
    users: () => users,
    usersCount: () => users.length,
    cumulativeGPA: () => users.map(user => user.cumulativeGPA),
    males: () => users.filter(user => user.gender == "male"),
    over25YearsOld: () => users.filter(user => user.age > 25).map(user => user.name),
    firstUser: () => users.find(user => user.id == 1),
    excellentMaleUsers: () => users.filter(user => user.cumulativeGPA >= 90 && user.gender == "male"),
    mohammadUsers: () => users.filter(user => user.name == "Mohammad"),
    graduatedUsers: () => users.filter(user => user.isGraduated),
    hasMore2Friends: () => users.filter(user => user.friends.length > 2)
  
  } */
}
