<script setup>
import { ref } from 'vue'
const emit = defineEmits(['start-quiz'])
const topic = ref('')
</script>

<template>
  <section class="start-screen container">
    <h2>Выберете тему для начала теста...</h2>
    <input v-model="topic" type="text" placeholder="Введите тему" />
    <button @click="emit('start-quiz', topic)" :disabled="!topic">Начать тест</button>
  </section>
</template>

<style scoped></style>
