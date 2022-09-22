import { users } from './mock_data';
export const resolvers = {
  Gender: {
    MALE: "male",
    FEMALE: "female"
  },
  Query: {
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
  },
}
