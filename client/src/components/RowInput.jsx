import React from 'react'

function RowInput({ type = 'text', value, onChange, placeholder = '', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`sheet-input ${className}`}
    />
  )
}

export default RowInput
