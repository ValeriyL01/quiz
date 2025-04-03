<script setup>
import { onMounted, ref } from 'vue'
const emit = defineEmits(['start-quiz'])
const topics = ref([])

async function fetchCategories() {
  const apiKey = import.meta.env.VITE_API_KEY
  const url = new URL('https://quizapi.io/api/v1/categories')

  url.searchParams.append('apiKey', apiKey)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }

    const data = await response.json()
    topics.value = data
    return data
  } catch (error) {
    console.error('Ошибка при получении категорий:', error.message)
    throw error
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <section class="start-screen container">
    <h2>Select a topic to start the test...</h2>
    <div>
      <button
        class="topicButton"
        @click="emit('start-quiz', topic.name)"
        v-for="(topic, index) in topics"
        :key="index"
      >
        {{ topic.name }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.topicButton {
  max-width: 200px;
}
</style>
