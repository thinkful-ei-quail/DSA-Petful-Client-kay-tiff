import React from 'react'

export default React.createContext({
  pets: [],
  cat: [],
  dog: [],
  queue: [],
  runDemo: () => {},
  enqueue: () => {},
  dequeue: () => {},
  onClickSubmit: () => {},
  onClickJoin: () => {},
  removeUser: () => {},
  userName: null,
  inLine: null,
  isFirst: ''
})
