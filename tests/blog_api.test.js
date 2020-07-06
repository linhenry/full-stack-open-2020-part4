const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const { initialBlogs } = require('./test_helper')

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has id property', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('a new blog is created', async () => {
  const newBlog = {
    "title": "Hello World Blog",
    "author": "Henry Lin",
    "url": "helloworldblog.com",
    "likes": "15"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('Hello World Blog')
})

afterAll(() => {
  mongoose.connection.close()
})