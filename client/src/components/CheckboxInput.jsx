import React from 'react'

function CheckboxInput({ checked, onChange, className = '' }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`sheet-checkbox ${className}`}
    />
  )
}

export default CheckboxInput
