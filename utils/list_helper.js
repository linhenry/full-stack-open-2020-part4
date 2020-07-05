const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return (favorite.likes >= blog.likes ? favorite : blog)
  })
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = []
  blogs.forEach(blog => {
    if (blogsByAuthor[blog.author] === undefined) {
      blogsByAuthor[blog.author] = 1
    } else {
      blogsByAuthor[blog.author]++
    }
  })

  let max = 0
  const mostBlogs = {
    "author": "none",
    "blogs": 0
  }

  for (const key in blogsByAuthor) {
    if (blogsByAuthor[key] > max) {
      max = blogsByAuthor[key]
      mostBlogs.author = key
      mostBlogs.blogs = blogsByAuthor[key]
    }
  }

  return mostBlogs
}

const mostLikes = (blogs) => {
  const authorLikes = []
  blogs.forEach(blog => {
    if (authorLikes[blog.author] === undefined) {
      authorLikes[blog.author] = blog.likes
    } else {
      authorLikes[blog.author] += blog.likes
    }
  })

  let max = 0
  const mostLikes = {
    "author": "none",
    "likes": 0
  }

  for (const key in authorLikes) {
    if (authorLikes[key] > max) {
      max = authorLikes[key]
      mostLikes.author = key
      mostLikes.likes = authorLikes[key]
    }
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
