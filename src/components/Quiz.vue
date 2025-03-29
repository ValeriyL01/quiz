<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['questions'])
const currentQuestion = ref(0)
const selectedOption = ref(null)
const submitAnswer = () => {
  currentQuestion.value++
}
const optionsFilter = computed(() => {
  const options = Object.values(props.questions[currentQuestion.value].answers)

  return options.filter((answer) => answer !== null)
})
</script>

<template>
  <section class="quiz container">
    <h2>Quiz component</h2>
    <div class="question">
      <h3>{{ questions[currentQuestion].question }}</h3>
    </div>
    <div class="answers">
      <button
        @click="selectedOption = answer"
        class="answer"
        v-for="answer in optionsFilter"
        :key="answer"
      >
        {{ answer }}
      </button>
    </div>
    <button @click="submitAnswer">Send</button>
  </section>
</template>

<style scoped></style>
