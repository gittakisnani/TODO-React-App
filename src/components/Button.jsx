import React from 'react'

const Button = ({ content, className, title, onClick, id, type='button' }) => {
  return (
    <button
    type={type}
    className={`cursor-pointer text-base md:text-lg ${className || ''}`}
    title={title}
    onClick={onClick}
    id={id}
    >
    {content}
    </button>
  )
}

export default Button