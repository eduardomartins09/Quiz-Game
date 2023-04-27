import { useState } from 'react'
import { QuestionsState, fetchQuizQuestions } from '../api'
import QuestionCard from '../components/QuestionCard';
import { triviaCategories, triviaDifficulty } from '../utils/util';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const Homepage = () => {
    const [loading, setLoading] = useState(false)
    const [numberCategory, setNumberCategory] = useState(0)
    const [difficulty, setDifficulty] = useState('')
    const [questions, setQuestions] = useState<QuestionsState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [selectQuiz, setSelectQuiz] = useState(false)
  
    const startTrivia = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setSelectQuiz(false)   
        setLoading(true)
        setGameOver(false)
        const newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          numberCategory,
          difficulty
        )
        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
    }
  
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
        const answer = e.currentTarget.value
        const correct = questions[number].correct_answer === answer
        
        if (correct) setScore((prev) => prev + 1)
        
        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer
        }
  
        setUserAnswers((prev) => [...prev, answerObject])
      }
    }
  
    const nextQuestion = () => {
      const nextQ = number + 1
  
      if (nextQ === TOTAL_QUESTIONS) {
        setGameOver(true)
      } else {
        setNumber(nextQ)
      }
    }
   
    const handleDifficulty = (event: React.BaseSyntheticEvent<MouseEvent>) => {
      setDifficulty(event.currentTarget.value);
    };

    const handleCategory = (event: React.BaseSyntheticEvent<MouseEvent>) => {
      setNumberCategory(event.currentTarget.value);
    };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", }}>
      <h1>React Quiz</h1> 
      {!selectQuiz && gameOver && (
        <div>
            <button className='dois' onClick={() => setSelectQuiz(true)} style={{ marginRight: "1rem" }}>
              Quiz
            </button>
        </div>   
      )} 
      {selectQuiz && (
        <form 
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          onSubmit={startTrivia}
        >
          <label>Selecione uma categoria</label>
          <select onChange={handleCategory}>
            {triviaCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label>Selecione a dificuldade</label>
          <select onChange={handleDifficulty}>
            {triviaDifficulty.map((difficulty) => (
              <option key={difficulty.id} value={difficulty.name}>
                {difficulty.name}
              </option>
            ))}
          </select>
          <button type='submit'>Iniciar</button>
        </form>
      )}

      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null} 

      {!loading && !gameOver && (
        <div style={{ padding: "1rem" }}>
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        </div>
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button onClick={nextQuestion} style={{ marginTop: "1rem" }}>
          Next Question
        </button>
      ) :null}
    </div>
  )
}

export default Homepage