const News = `
  type News {
    _id: ID!
    title: String!
    content: String!
    imgtexturl: String!
  }
  
  extend type Query {
    getNewsPost(_id: ID!): News
    getNews: [News]
  }
  extend type Mutation {
    createNews(title: String!, content: String!, imgtexturl: String!): String!
  } `

module.exports = News