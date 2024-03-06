//Create definitions to outline how data will be handled moving in and out of the database
const typeDefs = `
  type Query{
    me(userId: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(userId: ID!, bookId: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput{
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }
  
`;

//Export the module for use
module.exports = typeDefs;