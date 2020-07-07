const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const blog = require('../models/blog')

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

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('endblogs', blogsAtEnd)
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 202 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlog = {
      likes: 0,
      title: 'title updated',
      author: 'author updated',
      url: 'url updated',
    }
    
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(202)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blogs => blogs.title)
    expect(titles).toContain('title updated') 
  })
})


afterAll(() => {
  mongoose.connection.close()
})