import axios from 'axios';
import { defineStore } from 'pinia'
import type { QuestionType } from '~/types/question';
import type { ScoreType, SummaryType, SuggesstionType, SendType } from '~/types/score';
import type { ResponseType } from '~/types/user';

export const useScore = defineStore('score', () => {
  const score = ref<ScoreType[]>()
  const scoreTC = ref<SendType[]>()
  const scoreSP = ref<SendType[]>()
  const scoreIT = ref<SendType[]>()
  const scoreEC = ref<SendType[]>()
  const checkScoreTC = ref(false)
  const checkScoreSP = ref(false)
  const checkScoreIT = ref(false)
  const checkScoreEC = ref(false)
  const postScore = ref<ResponseType>()
  const summary = ref<SummaryType>()
  const suggession = ref<SuggesstionType>()

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
  const getSummary = computed(() => summary.value)
  const getSuggession = computed(() => suggession.value)

  const setScoreTC = async (scores: Record<string, number>, questions: QuestionType[]) => {
    if (Object.keys(scores).length === 9) {
      checkScoreTC.value = true
      scoreTC.value = [
        {
          value: scores.question_1,
          questionId: questions[0].id
        },
        {
          value: scores.question_2,
          questionId: questions[1].id
        },
        {
          value: scores.question_3,
          questionId: questions[2].id
        },
        {
          value: scores.question_4,
          questionId: questions[3].id
        },
        {
          value: scores.question_5,
          questionId: questions[4].id
        },
        {
          value: scores.question_6,
          questionId: questions[5].id
        },
        {
          value: scores.question_7,
          questionId: questions[6].id
        },
        {
          value: scores.question_8,
          questionId: questions[7].id
        },
        {
          value: scores.question_9,
          questionId: questions[8].id
        },
      ]
    } else {
      checkScoreTC.value = false
    }
  }
  const setScoreSP = (scores: Record<string, number>, questions: QuestionType[]) => {
    if (Object.keys(scores).length === 3) {
      checkScoreSP.value = true
      scoreSP.value = [
        {
          value: scores.question_1,
          questionId: questions[0].id
        },
        {
          value: scores.question_2,
          questionId: questions[1].id
        },
        {
          value: scores.question_3,
          questionId: questions[2].id
        }
      ]
    } else {
      checkScoreSP.value = false
    }
  }
  const setScoreIT = (scores: Record<string, number>, questions: QuestionType[]) => {
    if (Object.keys(scores).length === 7) {
      checkScoreIT.value = true
      scoreIT.value = [
        {
          value: scores.question_1,
          questionId: questions[0].id
        },
        {
          value: scores.question_2,
          questionId: questions[1].id
        },
        {
          value: scores.question_3,
          questionId: questions[2].id
        },
        {
          value: scores.question_4,
          questionId: questions[3].id
        },
        {
          value: scores.question_5,
          questionId: questions[4].id
        },
        {
          value: scores.question_6,
          questionId: questions[5].id
        },
        {
          value: scores.question_7,
          questionId: questions[6].id
        }
      ]
    } else {
      checkScoreIT.value = false
    }
  }
  const setScoreEC = (scores: Record<string, number>, questions: QuestionType[]) => {
    if (Object.keys(scores).length === 11) {
      checkScoreEC.value = true
      scoreEC.value = [
        {
          value: scores.question_1,
          questionId: questions[0].id
        },
        {
          value: scores.question_2,
          questionId: questions[1].id
        },
        {
          value: scores.question_3,
          questionId: questions[2].id
        },
        {
          value: scores.question_4,
          questionId: questions[3].id
        },
        {
          value: scores.question_5,
          questionId: questions[4].id
        },
        {
          value: scores.question_6,
          questionId: questions[5].id
        },
        {
          value: scores.question_7,
          questionId: questions[6].id
        },
        {
          value: scores.question_8,
          questionId: questions[7].id
        },
        {
          value: scores.question_9,
          questionId: questions[8].id
        },
        {
          value: scores.question_10,
          questionId: questions[9].id
        },
        {
          value: scores.question_11,
          questionId: questions[10].id
        },
      ]
    } else {
      checkScoreEC.value = false
    }
  }
  const fetchScore = async (token: string) => {
    try {
      const { data } = await axios.get<ScoreType[]>(`${import.meta.env.VITE_API}/score`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      score.value = data

    } catch (err) {
      console.log("test ", err)
    }
  }
  const sendScore = async (playload: SendType[]) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put<ResponseType>(`${import.meta.env.VITE_API}/score/update`, playload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      postScore.value = data
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get<SummaryType>(`${import.meta.env.VITE_API}/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      summary.value = data
    } catch (err) {
      console.log(err)
    }
  }
  const fetchSuggession = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get<SuggesstionType>(`${import.meta.env.VITE_API}/suggesstion`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      suggession.value = data
    } catch (err) {
      console.log(err)
    }
  }


  return {
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
    getSummary,
    getSuggession,
    setScoreTC,
    setScoreSP,
    setScoreIT,
    setScoreEC,
    fetchScore,
    sendScore,
    fetchSummary,
    fetchSuggession,
  }
});