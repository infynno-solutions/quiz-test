import React, { useEffect, useState } from 'react'
import { display } from '../utils/helper'
const QuestionCounter = (props) => {
  const [seconds, setseconds] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setseconds((old) => old + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="d-flex justify-content-between">
      <div>
        {`Question ${props.count} of
        ${props.total}`}
      </div>
      <div>{display(seconds)}</div>
    </div>
  )
}

export default QuestionCounter
