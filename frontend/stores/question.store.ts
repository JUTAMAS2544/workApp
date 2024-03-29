import axios from 'axios';
import { defineStore } from 'pinia'
import type { QuestionType } from '~/types/question';

export const useQuestion = defineStore('question', () => {
  const question = ref<QuestionType[]>()

  const getQuestion = computed(() => question.value)

  const fetchQuestion = async () => {
    try {
      const { data } = await axios.get<QuestionType[]>(`${import.meta.env.VITE_API}/question`)
      question.value = data
    } catch (err) {
      console.log(err)
    }
  }

  return {
    getQuestion,
    fetchQuestion,
  }
});