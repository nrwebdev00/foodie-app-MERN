import React from 'react'

function Message(props) {

  return (
    <div className={`message ${props.variant}`}>
      {props.message}
    </div>
  )
}

export default Message