import React from 'react'

export default React.createContext({
  pets: [],
  cat: [],
  dog: [],
  queue: [],
  enqueue: () => {},
  dequeue: () => {},
  splitName: () => {},
  inLine: '',
  isFirst: '',
})
