import React from 'react'
import { Card, Button, CardHeader, CardBody, CardTitle } from 'reactstrap'
import QuestionCounter from './QuestionCounter'

const Questions = ({
  curQuestion,
  questions,
  handleChange,
  getAnswer,
  setCurQuestions,
  getValidate,
  setTime,
}) => {
  return (
    <Card>
      <CardHeader tag="h5">
        <QuestionCounter count={curQuestion + 1} total={questions.length} />
      </CardHeader>
      <CardBody>
        <CardTitle>Select True or false</CardTitle>
        <h4 className="my-2">{questions[curQuestion]?.question}</h4>
        <div className="mt-3">
          <input
            id="true"
            type="radio"
            value={1}
            name="answer"
            onChange={(e) => {
              handleChange(e.target.value, questions[curQuestion]?.id)
            }}
            checked={getAnswer(questions[curQuestion]?.id) == 1}
          />
          <label style={{ cursor: 'pointer' }} className="mx-2 " htmlFor="true">
            True
          </label>
        </div>
        <div className="my-1">
          <input
            id="false"
            type="radio"
            value={0}
            name="answer"
            onChange={(e) => {
              handleChange(e.target.value, questions[curQuestion]?.id)
            }}
            checked={getAnswer(questions[curQuestion]?.id) == 0}
          />
          <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="false">
            False
          </label>
        </div>
        <div className="d-flex justify-content-between mt-4 mb-2">
          {curQuestion + 1 === 1 ? (
            <Button disabled>Previous</Button>
          ) : (
            <Button onClick={() => setCurQuestions(curQuestion - 1)}>
              Previous
            </Button>
          )}
          {curQuestion + 1 === questions.length ? (
            <Button
              color="primary"
              onClick={() => {
                setTime((oldTime) => {
                  return {
                    ...oldTime,
                    endTime: Date.now(),
                  }
                })
                getValidate()
              }}
              disabled={!getAnswer(questions[curQuestion]?.id)}
            >
              Finish
            </Button>
          ) : (
            <Button
              color="info"
              onClick={() => setCurQuestions(curQuestion + 1)}
              disabled={!getAnswer(questions[curQuestion]?.id)}
            >
              Next
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default Questions
