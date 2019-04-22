import React from 'react'

function If({ condition, children }) {
  return condition && children
}

export default If
