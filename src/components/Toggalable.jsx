import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Toggalable = forwardRef((props,ref) => {
  const[visible,setVisible]=useState('')
  const hideWhenVisible={ display:visible?'none':'' }
  const showWhenVisible={ display:visible?'':'none' }
  const toggleVisibility=() => {
    setVisible(!visible)
  }
  useImperativeHandle(ref,() => ({
    toggleVisibility
  }))
  return (
    <>
      <div style={hideWhenVisible}>
        {console.log(hideWhenVisible)}

        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {console.log(showWhenVisible)}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>

    </>
  )
}
)
export default Toggalable