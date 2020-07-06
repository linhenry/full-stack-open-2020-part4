const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response, next) => {
  const blog = await new Blog(request.body).save();
  response.status(200).json(blog);
})

module.exports = blogsRouter