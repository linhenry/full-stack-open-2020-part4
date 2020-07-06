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
  expect(blogs[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      "title": "Hello World Blog",
      "author": "Henry Lin",
      "url": "helloworldblog.com",
      "likes": "15"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Hello World Blog')
  })

  test('when likes is not specified', async () => {
    const newBlog = {
      "title": "Hello World Blog",
      "author": "Henry Lin",
      "url": "helloworldblog.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogs = await helper.blogsInDb()
    expect(blogs[3].likes).toBe(0)
  })

  test('when title or url is missing', async () => {
    const newBlog = {
      "title": "Hello World Blog",
      "author": "Henry Lin",
      "likes": "15"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})