const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

/* The function returns the author who has the largest amount of blogs
The return value also contains the number of blogs the top author has */
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

  // key is name of author
  // blogsByAuthor[key] is number of blogs
  for (const key in blogsByAuthor) {
    if (blogsByAuthor[key] > max) {
      max = blogsByAuthor[key]
      mostBlogs.author = key
      mostBlogs.blogs = blogsByAuthor[key]
    }
  }

  return mostBlogs
}

/* The function returns the author, whose blog posts have the largest amount of likes
The return value also contains the total number of likes that the author has received: */
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

  // key is name of author
  // authorLikes[key] is number of likes
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
