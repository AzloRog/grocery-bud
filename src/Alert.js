import React, { useEffect } from 'react'

const Alert = ({type, text, removeAlert, list}) => {

  useEffect(() => {
    const timeout = setTimeout(() => removeAlert(), 3000);

    return () => clearTimeout(timeout);
  }, [list])

  return (
    <p className={`alert alert-${type}`}>{text}</p>
  )
}

export default Alert
