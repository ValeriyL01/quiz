<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['questions'])
const emit = defineEmits(['store-answer', 'end-quiz'])
const currentQuestion = ref(0)
const selectedOption = ref(null)
const submitAnswer = () => {
  const current = props.questions[currentQuestion.value]

  const correctAnswerKey = Object.keys(current.correct_answers).find(
    (key) => current.correct_answers[key] === 'true',
  )

  const correctAnswer = correctAnswerKey
    ? current.answers[correctAnswerKey.replace('_correct', '')]
    : null
  emit('store-answer', {
    question: current.question,
    userAnswer: selectedOption.value,
    correctAnswer: correctAnswer,
  })
  selectedOption.value = null
  if (currentQuestion.value === props.questions.length - 1) {
    currentQuestion.value = 0

    emit('end-quiz')
  } else {
    currentQuestion.value++
  }
}
const optionsFilter = computed(() => {
  const options = Object.values(props.questions[currentQuestion.value].answers)

  return options.filter((answer) => answer !== null)
})
</script>

<template>
  <section class="quiz container">
    <div class="header">
      <h2>Quiz</h2>
      <p>Question {{ currentQuestion + 1 }} of {{ props.questions.length }}</p>
    </div>
    <progress max="100" :value="((currentQuestion + 1) / props.questions.length) * 100"></progress>
    <h2>Quiz component</h2>
    <div class="question">
      <h3>{{ props.questions[currentQuestion].question }}</h3>
    </div>
    <div class="answers">
      <button
        :class="{ active: answer === selectedOption }"
        @click="selectedOption = answer"
        class="answer"
        v-for="answer in optionsFilter"
        :key="answer"
      >
        {{ answer }}
      </button>
    </div>
    <button :disabled="selectedOption === null" @click="submitAnswer">Send</button>
  </section>
</template>

<style scoped></style>
