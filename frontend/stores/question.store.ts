import axios from 'axios';
import { defineStore } from 'pinia'
import type { QuestionEC, QuestionIT, QuestionSP, QuestionTC } from '~/types/question';

export const useQuestion = defineStore('question', () => {
  const questionTC = ref<QuestionTC>()
  const questionSP = ref<QuestionSP>()
  const questionIT = ref<QuestionIT>()
  const questionEC = ref<QuestionEC>()

  const getQuestionTC = computed(() => questionTC.value)
  const getQuestionSP = computed(() => questionSP.value)
  const getQuestionIT = computed(() => questionIT.value)
  const getQuestionEC = computed(() => questionEC.value)

  const fetchQuestionTC = async () => {
    try {
      const { data } = await axios.get<QuestionTC>(`${import.meta.env.VITE_API}/question/tc/`)
      questionTC.value = data
    } catch (err) {
      console.log(err)
    }
  }
  const fetchQuestionSP = async () => {
    try {
      const { data } = await axios.get<QuestionSP>(`${import.meta.env.VITE_API}/question/sp/`)
      questionSP.value = data
    } catch (err) {
      console.log(err)
    }
  }
  const fetchQuestionIT = async () => {
    try {
      const { data } = await axios.get<QuestionIT>(`${import.meta.env.VITE_API}/question/it/`)
      questionIT.value = data
    } catch (err) {
      console.log(err)
    }
  }
  const fetchQuestionEC = async () => {
    try {
      const { data } = await axios.get<QuestionEC>(`${import.meta.env.VITE_API}/question/ec/`)
      questionEC.value = data
    } catch (err) {
      console.log(err)
    }
  }

  return {
    getQuestionTC,
    getQuestionSP,
    getQuestionIT,
    getQuestionEC,
    fetchQuestionTC,
    fetchQuestionSP,
    fetchQuestionIT,
    fetchQuestionEC,
  }
});