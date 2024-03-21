import axios from 'axios';
import { defineStore } from 'pinia'
import type { QuestionTC } from '~/types/question';

export const useQuestion = defineStore('question', () => {
  const questionTC = ref<QuestionTC>()
  const getQuestionTC = computed(() => questionTC.value)
  const fetchQuestionTC = async () => {
    try {
      const { data } = await axios.get<QuestionTC>(`${import.meta.env.VITE_API}/question/tc/`)
      questionTC.value = data
    } catch (err) {
      console.log(err)
    }
  }
  return {
    getQuestionTC,
    fetchQuestionTC,
  }
});