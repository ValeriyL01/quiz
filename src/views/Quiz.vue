<script setup>
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'
const selectedOption = ref(null)
const quizStore = useQuizStore()

const router = useRouter()

const storeAnswer = (userAnswer) => {
  const currentQuestion = quizStore.questions[quizStore.currentQuestionIndex]
  const correctAnswerKey = Object.keys(currentQuestion.correct_answers).find(
    (key) => currentQuestion.correct_answers[key] === 'true',
  )
  const correctAnswer = correctAnswerKey
    ? currentQuestion.answers[correctAnswerKey.replace('_correct', '')]
    : null

  quizStore.userAnswers.push({
    question: currentQuestion.question,
    userAnswer,
    correctAnswer,
  })
}
const nextQuestion = () => {
  if (quizStore.currentQuestionIndex < quizStore.questions.length - 1) {
    quizStore.currentQuestionIndex++
  } else {
    quizStore.currentQuestionIndex = 0
  }
}
const submitAnswer = () => {
  if (selectedOption.value !== null) {
    storeAnswer(selectedOption.value)
    selectedOption.value = null

    if (quizStore.currentQuestionIndex === quizStore.questions.length - 1) {
      router.push('/result')
    } else {
      nextQuestion()
    }
  }
}
const filteredOptions = computed(() => {
  const currentQuestion = quizStore.questions[quizStore.currentQuestionIndex]
  if (!currentQuestion) return []
  return Object.values(currentQuestion.answers).filter((answer) => answer !== null)
})
</script>

<template>
  <section class="quiz container">
    <div class="header">
      <h2>Quiz</h2>
      <p>Question {{ quizStore.currentQuestionIndex + 1 }} of {{ quizStore.questions.length }}</p>
    </div>
    <progress
      max="100"
      :value="((quizStore.currentQuestionIndex + 1) / quizStore.questions.length) * 100"
    ></progress>

    <div class="question">
      <h3>{{ quizStore.questions[quizStore.currentQuestionIndex].question }}</h3>
    </div>
    <div class="answers">
      <button
        :class="{ active: answer === selectedOption }"
        @click="selectedOption = answer"
        class="answer"
        v-for="answer in filteredOptions"
        :key="answer"
      >
        {{ answer }}
      </button>
    </div>
    <button :disabled="selectedOption === null" @click="submitAnswer">Send</button>
  </section>
</template>

<style scoped>
.quiz {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    h2 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  }

  .question {
    padding-top: 40px;
    h3 {
      font-size: 40px;
    }
  }
  .answers {
    padding-top: 30px;
  }
}
progress {
  width: 100%;
  height: 20px;
  background-color: var(--light-color);
  position: relative;
  border: 1px solid var(--light-color);
  border-radius: 10px;
  overflow: hidden;
  &::-webkit-progress-bar {
    background-color: var(--light-color);
  }
  &::-webkit-progress-value {
    background: var(--primary-gradient);
  }
  &::-moz-progress-bar {
    background: var(--primary-gradient);
  }
}
</style>
