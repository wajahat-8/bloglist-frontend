import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const newUser=(event) => {
    event.preventDefault()
    props.handleLogin({ username,password })
    setUsername('')
    setPassword('')
  }
  return(
    <>
      <h1>Please Login</h1>
      <form onSubmit={newUser}>
        <div>
          <label>
              username <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
              password <input
              type="password" // Changed to password type for security
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm