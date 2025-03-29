<script setup>
import StartScreen from './components/StartScreen.vue'
import Quiz from './components/Quiz.vue'
import Loader from './components/Loader.vue'
import { ref } from 'vue'
const questions = ref('')
const status = ref('start')
async function fetchQuizQuestions(topic) {
  const apiKey = import.meta.env.VITE_API_KEY
  const url = new URL('https://quizapi.io/api/v1/questions')

  url.searchParams.append('apiKey', apiKey)
  url.searchParams.append('limit', 5)
  url.searchParams.append('category', topic)

  try {
    const response = await fetch(url)
    status.value = 'loading'
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }

    const data = await response.json()
    questions.value = data
    status.value = 'ready'
    return data
  } catch (error) {
    console.error('Ошибка при получении вопросов:', error.message)
    throw error
  }
}
</script>

<template>
  <div id="app">
    <header>
      <div class="container">
        <h1>Quiz Generator</h1>
      </div>
    </header>
    <StartScreen v-if="status === 'start'" @start-quiz="fetchQuizQuestions"></StartScreen>
    <Quiz :questions="questions" v-if="status === 'ready'"></Quiz>
    <Loader v-if="status === 'loading'"></Loader>
  </div>
</template>

<style scoped></style>
