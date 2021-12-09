const News = require('../../../models/news')
const Auth = require('../../../services/auth.service')

module.exports = {
 

  Query: {
    getNews: () =>  News.find()
  //  getNews: async (_, context) => {
  
 
  //     console.log(context.userId)
  //     if (!context.userId) throw new Error('You must be authenticated!')
  //     News.find()
  //   }

    ,


    getNewsPost: async (_, { id }) => {
      if (!context.userId) throw new Error('You must be authenticated!')
      if (context.userId !== id) throw new Error('You can only see you own datas little fella!')

      return await News.findById(id)
    }
  },

  Mutation: {
    createNews: async (_, { title, content, imgtexturl }) => {
      const news = new News({ title, content, imgtexturl })
      await news.save()
      return 'News post successfully created!'
    }
      }
    }
  