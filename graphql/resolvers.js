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

  User: {
    email: (parent, args, context, info) => {
      return parent.email.toUpperCase()
    },
    friends: (parent, { cumulativeGPA }, context, info) => {
      return parent.friends.filter(
        friend => friend.cumulativeGPA == cumulativeGPA
      )
    }
  }

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
