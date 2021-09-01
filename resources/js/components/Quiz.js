import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap'
import Questions from './Questions'
import Result from './Result'

const Quiz = () => {
  const [questions, setQuestion] = useState([])
  const [curQuestion, setCurQuestions] = useState(0)
  const [result, setResult] = useState()
  const [answer, setAnswer] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [time, setTime] = useState({ startTime: 0, endTime: 0 })

  const getData = () => {
    axios.get('/api/questions').then((response) => {
      const myQuestions = response?.data?.questions
      setQuestion(myQuestions)
      setIsLoading(false)
      setTime((oldTime) => {
        return {
          ...oldTime,
          startTime: Date.now(),
        }
      })
    })
  }

  const getValidate = () => {
    setIsLoading(true)
    const ans = answer
    axios
      .post(
        '/api/validate',
        {
          attempt: ans,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        setIsLoading(false)
        setAnswer([])
        setCurQuestions(0)
        setResult(response.data)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      })
  }

  const setOption = (ans, ques) => {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].question_id === ques) {
        setAnswer([
          ...answer.slice(0, i),
          {
            question_id: ques,
            answer: ans,
          },
          ...answer.slice(i + 1),
        ])
        return
      }
    }
    setAnswer([
      ...answer,
      {
        question_id: ques,
        answer: ans,
      },
    ])
  }
  const getAnswer = (ques) => {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].question_id === ques) {
        return answer[i].answer
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ width: '90%', maxWidth: '600px', margin: '2rem auto' }}>
      <h1 className="text-center p-2">Quiz</h1>
      {isLoading ? (
        <div className="text-center my-4">
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <div className="text-center">
          <h5>{error}</h5>
        </div>
      ) : result ? (
        <Result
          result={result}
          total={questions.length}
          time={time}
          resetQuiz={() => {
            setAnswer([])
            setResult(null)
            setTime({
              startTime: Date.now(),
              endTime: 0,
            })
            setCurQuestions(0)
          }}
        />
      ) : (
        <Questions
          curQuestion={curQuestion}
          questions={questions}
          handleChange={setOption}
          getAnswer={getAnswer}
          setCurQuestions={setCurQuestions}
          getValidate={getValidate}
          setTime={setTime}
        />
      )}
    </div>
  )
}

export default Quiz
