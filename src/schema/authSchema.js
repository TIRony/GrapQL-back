const { makeExecutableSchema } = require("@graphql-tools/schema");
const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): AuthPayload
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = require("../resolvers/userResolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
