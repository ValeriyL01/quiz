import { ref } from 'vue'
import { defineStore } from 'pinia'
const apiKey = import.meta.env.VITE_API_KEY
export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([])
  const userAnswers = ref([])
  const currentQuestionIndex = ref(0)

  const fetchCategories = async () => {
    const url = `https://quizapi.io/api/v1/categories?apiKey=${apiKey}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при получении категорий:', error.message)
      throw error
    }
  }
  const fetchQuizQuestions = async (topic) => {
    const url = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=5&category=${topic}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      const data = await response.json()
      questions.value = data
      return data
    } catch (error) {
      console.error('Ошибка при получении вопросов:', error.message)
      throw error
    }
  }

  const restartQuiz = () => {
    questions.value = []
    currentQuestionIndex.value = 0
    userAnswers.value = []
  }

  return {
    questions,
    userAnswers,
    currentQuestionIndex,
    fetchQuizQuestions,
    restartQuiz,

    fetchCategories,
  }
})
