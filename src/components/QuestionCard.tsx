import { AnswerObject } from '../pages/Homepage'

type Props = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNr: number
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {answers.map((answer) => (
                <button
                    key={answer}
                    disabled={userAnswer ? true : false} value={answer} 
                    onClick={callback}
                >                 
                    <span dangerouslySetInnerHTML={{ __html: answer }} />              
                </button>
            ))}
        </div>
    </div>
  )
}

export default QuestionCard