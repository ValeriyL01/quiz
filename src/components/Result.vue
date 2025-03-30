<script setup>
import { computed } from 'vue'
const props = defineProps(['userAnswers'])
const emit = defineEmits(['restart-quiz'])
const correctAnswersCount = computed(() => {
  return props.userAnswers.filter((answer) => answer.userAnswer === answer.correctAnswer).length
})
</script>

<template>
  <section class="result-screen container">
    <h1 v-if="correctAnswersCount === props.userAnswers.length">Congratulations!&#127881;</h1>
    <h1>
      You have answered {{ correctAnswersCount }} out of {{ userAnswers.length }} questions
      correctly.
    </h1>
    <ul>
      <li
        v-for="(answer, index) in props.userAnswers"
        :key="index"
        :class="answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'"
      >
        <p v-html="answer.userAnswer === answer.correctAnswer ? '&#9989;' : '&#10060;'"></p>
        <b>{{ answer.question }}</b>
        <p>User answer:{{ answer.userAnswer }}</p>
        <p>Correct answer:{{ answer.correctAnswer }}</p>
      </li>
    </ul>
    <button @click="emit('restart-quiz')">Create a New Quiz</button>
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
