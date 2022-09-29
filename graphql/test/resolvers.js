// import { users } from './mock_data';

const users = [
  {
     "id":1,
     "name":"Magdalena",
     "email":"mgrewes0@chronoengine.com",
     "gender":"male",
     "mobile":"734-324-1043",
     "cumulativeGPA":92.1,
     "isGraduated":true,
     "friends":[
        {
           "name":"Magdalena",
           "email":"mgrewes0@chronoengine.com",
           "gender":"male",
           "mobile":"734-324-1043",
           "cumulativeGPA":92.1
        },
        {
           "name":"Harman",
           "email":"hgaspero2@1688.com",
           "gender":"male",
           "mobile":"158-265-8979",
           "cumulativeGPA":87.9
        },
        {
           "name":"Oliver",
           "email":"ocourtliff4@spotify.com",
           "gender":"female",
           "mobile":"500-958-5193",
           "cumulativeGPA":67.9
        }
     ],
     "age":28,
     "image" : {"name":"ghklk.png", "height": 50 , "width":30},
     "idea": "auction",
     "grantedAmount": 12000
  },
  {
     "id":2,
     "name":"Lyndell",
     "email":"lgilbee1@google.com.br",
     "gender":"male",
     "mobile":"165-705-3521",
     "cumulativeGPA":90.6,
     "isGraduated":false,
     "friends":[
        {
           "name":"Magdalena",
           "email":"mgrewes0@chronoengine.com",
           "gender":"male",
           "mobile":"734-324-1043",
           "cumulativeGPA":92.1
        },
        {
           "name":"Harman",
           "email":"hgaspero2@1688.com",
           "gender":"male",
           "mobile":"158-265-8979",
           "cumulativeGPA":87.9
        },
        {
           "name":"Oliver",
           "email":"ocourtliff4@spotify.com",
           "gender":"female",
           "mobile":"500-958-5193",
           "cumulativeGPA":67.9
        }
     ],
     "age":23,
     "image" : {"name":"ghklk.png", "height": 50, "width":30},
     "idea": "e-collage",
     "grantedAmount": 0
  },
  {
     "id":3,
     "name":"Harman",
     "email":"hgaspero2@1688.com",
     "gender":"male",
     "mobile":"158-265-8979",
     "cumulativeGPA":87.9,
     "isGraduated":false,
     "friends":[
        {
           "name":"Magdalena",
           "email":"mgrewes0@chronoengine.com",
           "gender":"male",
           "mobile":"734-324-1043",
           "cumulativeGPA":92.1
        },
        {
           "name":"Harman",
           "email":"hgaspero2@1688.com",
           "gender":"male",
           "mobile":"158-265-8979",
           "cumulativeGPA":87.9
        },
        {
           "name":"Oliver",
           "email":"ocourtliff4@spotify.com",
           "gender":"female",
           "mobile":"500-958-5193",
           "cumulativeGPA":67.9
        },
        {
           "name":"Rod",
           "email":"romoylanem@omniture.com",
           "gender":"male",
           "mobile":"487-863-3754",
           "cumulativeGPA":83.3
        }
     ],
     "age":26,
     "image" : {"name":"ghrtlk.png", "height": 51, "width":31},
     "idea": "book shop",
     "grantedAmount": 18000
  },
  {
    "id":4,
    "name":"Inna",
    "email":"igummie3@blinklist.com",
    "gender":"male",
    "mobile":"832-900-3701",
    "cumulativeGPA":86.8,
    "isGraduated":true,
    "friends":[
       {
          "name":"Magdalena",
          "email":"mgrewes0@chronoengine.com",
          "gender":"male",
          "mobile":"734-324-1043",
          "cumulativeGPA":92.1
       },
       {
          "name":"Harman",
          "email":"hgaspero2@1688.com",
          "gender":"male",
          "mobile":"158-265-8979",
          "cumulativeGPA":87.9
       },
       {
          "name":"Oliver",
          "email":"ocourtliff4@spotify.com",
          "gender":"female",
          "mobile":"500-958-5193",
          "cumulativeGPA":67.9
       }
    ],
    "age":22,
    "image" : {"name":"ghklk.png", "height": 52, "width":32},
    "idea": "sponge factory",
    "grantedAmount": 0
  },
]

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
    ),
    grantedBeforeUsers: () => users.filter(user => user.grantedAmount >0),
    usersWithFirstParticipation: () => users.filter(user => user.grantedAmount == 0)
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
  User: {
    __resolveType(parent, args, context, info) {
      if(parent.grantedAmount > 0) 
        return "GrantedBeforeUser"
      else 
        return "UserWithFirstParticipation"
      }
    }
  }

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

