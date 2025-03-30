<script setup>
import { ref } from 'vue'
const emit = defineEmits(['start-quiz'])
const topic = ref('')
const topics = [
  'Linux',
  'BASH',
  'Docker',
  'HTML',
  'Postgres',
  'Laravel',
  'React',
  'Django',
  'cPanel',
  'nodeJS',
  'WordPress',
  'Next.js',
  'VueJS',
  'Apache Kafka',
]
</script>

<template>
  <section class="start-screen container">
    <h2>Select a topic to start the test...</h2>
    <div>
      <button
        class="topicButton"
        @click="emit('start-quiz', topic)"
        v-for="(top, index) in topics"
        :key="index"
      >
        {{ top }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.topicButton {
  max-width: 200px;
}
</style>
