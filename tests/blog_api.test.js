const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

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
  console.log('blogs', blogs)
  expect(blogs[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})