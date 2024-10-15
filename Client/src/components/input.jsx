import React from 'react'

function Input({ field }) {
  return (
    <input type={field.type} required="" className="form-control" name={field.name} placeholder={field.placeholder} />
  )
}

export default Input