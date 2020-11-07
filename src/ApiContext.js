import React from 'react'

export default React.createContext({
  pets: [],
  cat: [],
  dog: [],
  queue: [],
  runDemo: () => {},
  enqueue: () => {},
  toggleFirst: ()=> {},
  dequeue: () => {},
  onClickSubmit: () => {},
  onClickJoin: () => {},
  inLine: '',
  isFirst: ''
})
