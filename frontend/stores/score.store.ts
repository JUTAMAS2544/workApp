import axios from 'axios';
import { defineStore } from 'pinia'
import type { ScoreType } from '~/types/score';
import type { UserType } from '~/types/user';

export const useScore = defineStore('score', () => {
  const score = ref<ScoreType>()
  const getScore = computed(() => score.value)
  const fetchScore = async (userId: number) => {
    try {
      const { data } = await axios.get<ScoreType>(`${import.meta.env.VITE_API}/score/${userId}`)
      score.value = data
    } catch (err) {
      console.log(err)
    }
  }
  return {
    getScore,
    fetchScore,
  }
});