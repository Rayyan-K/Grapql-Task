const User = require('../../../models/user')
const Auth = require('../../../services/auth.service')
const Blog = require('../../../models/blog')
const { findById } = require('../../../models/user')

var flag= true

module.exports = {
  Query: {

    // List all users
     getUsers: async() => User.find(),

    // List specific user based on ID passed
    getUser: async (_, {id},context) => {
      if (!context.userId) throw new Error('You must be authenticated!')
      if (context.userId !== id) throw new Error('You can only see you own datas!')

      return await User.findById(id)
    },

    // List all blogs
    getBlogs: async (_,context) => {
        console.log(flag)
        if (!flag) throw new Error('You must be authenticated!')
        return await Blog.find()
      }
  },

  Mutation: {

    // Create a new Blog Post
    createBlog: async (_, { title, content, imgtexturl }, context) => {
        //console.log(context.userId)
        if (!context.userId) throw new Error('You must be authenticated!')
        const blog = new Blog({ title, content, imgtexturl })
        await blog.save()
        return 'New blog post successfully created'
      },

      // Update Blog 
      updateBlog: async (_, {id, title, content, imgtexturl},context) => {
        console.log(context.userId)

        if (!context.userId) throw new Error('You must be authenticated!')


        return 'Blog post updated successfully!'        
        
    },

    // Delete a Blog Post
      deleteBlog: async (_, {id},context) => {
        console.log(context.userId)
        if (!context.userId) throw new Error('You must be authenticated!')

        //Blog.findByIdAndDelete(id);

           Blog.findByIdAndDelete(id, (error)=> {
            if (!Blog.findById(id)) throw new Error('Blog ID not found!') 
            } );

        return await 'Blog post deleted successfully!'        
        
    },


    // Register New User
    signup: async (_, { email, username, password }) => {
      const hashedPwd = await Auth.hashPassword(password)
      const user = new User({ email, username, password: hashedPwd })
      await user.save()
      return 'New user successfully created!'
    },

    // Login
    login: async (_, { email, username, password }) => {
      if (!username && !email) throw new Error('Email or Username required!')
      const userPayload = email ? { email } : {username}
      const user = await User.findOne(userPayload)
      if (!user) throw new Error('Unknown user', userPayload)

      const correctPassword = await Auth.matchPasswords(password, user.password)
      if (!correctPassword) throw new Error('Invalid password!')
    flag=true   
    console.log(flag)
      return {
        jwt: Auth.generateJwt({
          userId: user.id,
          username: user.username,
          email: user.email
        })
      }
    },
  }
}