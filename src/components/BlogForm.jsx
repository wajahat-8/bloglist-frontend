import React, {  useState } from 'react'
const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const createNew=(event) => {
    event.preventDefault()
    props.handleNewBlog({
      title,author,url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={createNew}>
      <div>
        <label>
              title: <input
            type='text'
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
              author: <input
            type='text'
            required
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
              Url: <input
            type='text'
            required
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type='submit'>Create</button>
    </form>

  )
}

export default BlogForm