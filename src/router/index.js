import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '../views/StartScreen.vue'
import Quiz from '../views/Quiz.vue'
import Result from '../views/Result.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartScreen,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
    },
  ],
})

export default router
