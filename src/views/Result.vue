<script setup>
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'
const quizStore = useQuizStore()
const router = useRouter()
const correctAnswersCount = computed(() => {
  return quizStore.userAnswers.filter((answer) => answer.userAnswer === answer.correctAnswer).length
})

const restart = () => {
  quizStore.restartQuiz()
  router.push('/')
}
</script>

<template>
  <section class="result-screen container">
    <h1 v-if="correctAnswersCount === quizStore.userAnswers.length">Congratulations!&#127881;</h1>
    <h1>
      You have answered {{ correctAnswersCount }} out of
      {{ quizStore.userAnswers.length }} questions correctly.
    </h1>
    <ul>
      <li
        v-for="(answer, index) in quizStore.userAnswers"
        :key="index"
        :class="answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'"
      >
        <p v-html="answer.userAnswer === answer.correctAnswer ? '&#9989;' : '&#10060;'"></p>
        <b>{{ answer.question }}</b>
        <p>User answer:{{ answer.userAnswer }}</p>
        <p>Correct answer:{{ answer.correctAnswer }}</p>
      </li>
    </ul>
    <button @click="restart">Create a New Quiz</button>
  </section>
</template>

<style scoped>
.result-screen {
  ul {
    li {
      border: 1px solid var(--light-color);
      margin: 20px auto;
      padding: 12px;
      max-width: 480px;
      border-width: 2px;
      b {
        display: block;
        margin-bottom: 12px;
      }
      &.correct {
        border-color: var(--corect-color);
      }
      &.incorrect {
        border-color: var(--incorrect-color);
      }
    }
  }
}
</style>
