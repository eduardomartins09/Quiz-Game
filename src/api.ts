import { shuffleArray } from "./utils/util"

export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}  

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum Category {
    GeneralKnowledge = 9,
    EntertainmentBooks = 10,
    EntertainmentFilm = 11,
    EntertainmentMusic = 12,
    EntertainmentMusicalsAndTheatres = 13,
    EntertainmentTelevision = 14,
    EntertainmentVideoGames = 15,
    EntertainmentBoardGames = 16,
    ScienceAndNature = 17,
    ScienceComputers = 18,
    ScienceMathematics = 19,
    Mythology = 20,
    Sports = 21,
    Geography = 22,
    History = 23,
    Politics = 24,
    Art = 25,
    Celebrities = 26,
    Animals = 27,
    Vehicles = 28,
    EntertainmentComics = 29,
    ScienceGadgets = 30,
    EntertainmentJapaneseAnimeAndManga = 31,
    EntertainmentCartoonAndAnimations = 32,
}

export type QuestionsState = Question & { answers: string[] }

export const fetchQuizQuestions = async (amount: number, category: number,difficulty: string): Promise<QuestionsState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

    const data = await (await fetch(endpoint)).json()

    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}