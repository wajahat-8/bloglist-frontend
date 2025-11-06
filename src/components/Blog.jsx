import { useState } from 'react'

const Blog = ({ blog,handleLike,onDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleView = () => {
    setShowDetails(!showDetails)
  }
  const onLikeClick=() => {
    handleLike(blog)
  }
  const handleDelete=() => {
    onDelete(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}
        <button onClick={toggleView}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && (
        <div>

          {blog.author}<br />
          {blog.url}<br />
          {blog.likes}<button onClick={onLikeClick}>like</button>
          <br />
          {blog.user && blog.user.name}
          <button onClick={handleDelete} style={{ backgroundColor: 'skyblue' }}>Remove</button>

        </div>
      )}


    </div>
  )
}

export default Blog
