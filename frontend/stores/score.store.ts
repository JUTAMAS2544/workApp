import axios from 'axios';
import { defineStore } from 'pinia'
import type { ScoreEC, ScoreIT, ScoreSP, ScoreTC, ScoreType, ScoreSendType } from '~/types/score';
import type { ResponseType } from '~/types/user';

export const useScore = defineStore('score', () => {
  const userID = ref(0)
  const score = ref<ScoreType>()
  const scoreTC = ref<ScoreTC>()
  const scoreSP = ref<ScoreSP>()
  const scoreIT = ref<ScoreIT>()
  const scoreEC = ref<ScoreEC>()
  const checkScoreTC = ref(false)
  const checkScoreSP = ref(false)
  const checkScoreIT = ref(false)
  const checkScoreEC = ref(false)
  const postScore = ref<ResponseType>()

  const getUserID = computed(() => userID.value)
  const getScore = computed(() => score.value)
  const getScoreTC = computed(() => scoreTC.value)
  const getScoreSP = computed(() => scoreSP.value)
  const getScoreIT = computed(() => scoreIT.value)
  const getScoreEC = computed(() => scoreEC.value)
  const getCheckScoreTC = computed(() => checkScoreTC.value)
  const getCheckScoreSP = computed(() => checkScoreSP.value)
  const getCheckScoreIT = computed(() => checkScoreIT.value)
  const getCheckScoreEC = computed(() => checkScoreEC.value)
  const getPostScore = computed(() => postScore.value)

  const setUserID = (id: number) => {
    userID.value = id
  }
  const setScoreTC = (scores: Record<string, number>) => {
    if (Object.keys(scores).length === 9) {
      checkScoreTC.value = true
      scoreTC.value = {
        question_1: scores.question_1,
        question_2: scores.question_2,
        question_3: scores.question_3,
        question_4: scores.question_4,
        question_5: scores.question_5,
        question_6: scores.question_6,
        question_7: scores.question_7,
        question_8: scores.question_8,
        question_9: scores.question_9,
      }
    } else {
      checkScoreTC.value = false
    }
  }
  const setScoreSP = (scores: Record<string, number>) => {
    if (Object.keys(scores).length === 3) {
      checkScoreSP.value = true
      scoreSP.value = {
        question_1: scores.question_1,
        question_2: scores.question_2,
        question_3: scores.question_3,
      }
    } else {
      checkScoreSP.value = false
    }
  }
  const setScoreIT = (scores: Record<string, number>) => {
    if (Object.keys(scores).length === 7) {
      checkScoreIT.value = true
      scoreIT.value = {
        question_1: scores.question_1,
        question_2: scores.question_2,
        question_3: scores.question_3,
        question_4: scores.question_4,
        question_5: scores.question_5,
        question_6: scores.question_6,
        question_7: scores.question_7,
      }
    } else {
      checkScoreIT.value = false
    }
  }
  const setScoreEC = (scores: Record<string, number>) => {
    if (Object.keys(scores).length === 11) {
      checkScoreEC.value = true
      scoreEC.value = {
        question_1: scores.question_1,
        question_2: scores.question_2,
        question_3: scores.question_3,
        question_4: scores.question_4,
        question_5: scores.question_5,
        question_6: scores.question_6,
        question_7: scores.question_7,
        question_8: scores.question_8,
        question_9: scores.question_9,
        question_10: scores.question_10,
        question_11: scores.question_11
      }
    } else {
      checkScoreEC.value = false
    }
  }
  const fetchScore = async (userId: number) => {
    try {
      const { data } = await axios.get<ScoreType>(`${import.meta.env.VITE_API}/score/${userId}`)
      score.value = data
    } catch (err) {
      console.log(err)
    }
  }
  const sendScore = async (playload: ScoreSendType) => {
    try {
      const { data } = await axios.put<ResponseType>(`${import.meta.env.VITE_API}/score/update/${playload.userId}`, playload)
      postScore.value = data
    } catch (err) {
      console.log(err)
    }
  }

  return {
    getUserID,
    getScore,
    getScoreTC,
    getScoreSP,
    getScoreIT,
    getScoreEC,
    getCheckScoreTC,
    getCheckScoreSP,
    getCheckScoreIT,
    getCheckScoreEC,
    getPostScore,
    setUserID,
    setScoreTC,
    setScoreSP,
    setScoreIT,
    setScoreEC,
    fetchScore,
    sendScore,
  }
});