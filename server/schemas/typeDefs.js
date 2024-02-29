const typeDefs = `
  type Query{
    me: User!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User!
    me: User!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): Book
    removeBook(bookId: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Integer
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: Array!
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput{
    bookId: ID!
    authors: Array!
    description: String!
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }
  
`;

module.exports = typeDefs;
