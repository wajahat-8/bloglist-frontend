const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  // Ensure message has the expected structure
  const messageObj = typeof message === 'string'
    ? { text: message, type: 'error' }
    : message

  const style = {
    color: messageObj.type === 'error' ? 'red' : 'green',
    background: '#f4f4f4',
    fontSize: '18px',
    border: `2px solid ${messageObj.type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={style}>
      {messageObj.text}
    </div>
  )
}

export default Notification