const Blog = require('../models/blog')

const initialBlogs = [
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
    __v: 0 
  }, 
  { 
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

beforeEach(async() => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

module.exports = {
  initialBlogs,
  blogsInDb
}