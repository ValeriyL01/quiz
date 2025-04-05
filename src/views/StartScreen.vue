<script setup>
import Loader from '../components/Loader.vue'
import { onMounted, ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'

const loaderStatus = ref(true)
const router = useRouter()
const quizStore = useQuizStore()
const topics = ref([])
const startQuiz = async (topic) => {
  await quizStore.fetchQuizQuestions(topic.name)

  router.push('/quiz')
}
onMounted(async () => {
  const data = await quizStore.fetchCategories()
  topics.value = data
  loaderStatus.value = false
})
</script>

<template>
  <section class="start-screen container">
    <h2>Select a topic to start the test...</h2>
    <div>
      <button
        class="topicButton"
        @click="startQuiz(topic)"
        v-for="(topic, index) in topics"
        :key="index"
      >
        {{ topic.name }}
      </button>
    </div>
  </section>
  <Loader v-if="loaderStatus"></Loader>
</template>

<style scoped>
.topicButton {
  max-width: 200px;
}
</style>
