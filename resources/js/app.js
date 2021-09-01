import React from 'react'
import ReactDOM from 'react-dom'
import Quiz from './components/Quiz'
require('./bootstrap')

const App = () => {
  return (
    <>
      <Quiz />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
