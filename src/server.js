import { ApolloServer, gql } from 'apollo-server'
import books from './mockData'
import getEnv from './utils/getEnv'
import apolloWinstonLoggingPlugin from './plugins/apolloWinstonPlugin'

const PORT = getEnv('PORT', 4000)

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [apolloWinstonLoggingPlugin()],
})

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
