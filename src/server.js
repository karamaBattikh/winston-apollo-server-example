import { ApolloServer, gql } from 'apollo-server';
import books from './mockData';
import getEnv from './utils/getEnv';

const PORT = getEnv('PORT', 4000);

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
