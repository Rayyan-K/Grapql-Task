const User = `
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
  }
  type Token {
    jwt: ID!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    imgtexturl: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getBlogs: [Blog]

  }
  type Mutation {
    signup(email: String!, username: String!, password: String!): String!,
    login(email: String, username: String, password: String!): Token!,
    createBlog(title: String!, content: String!, imgtexturl: String!): String!,
    deleteBlog(id:ID!): String!,
    updateBlog(id:ID!, title: String, content: String, imgtexturl: String): String!,

  } `

module.exports = User