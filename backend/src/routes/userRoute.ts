import express, { Request, Response } from "express";

const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  register,
  login,
  changePassword
} from "../controller/userController"

import {
  getScoreList,
  getSummary,
  createScore,
} from "../controller/scoreController"

import {
  getQuestionsTC,
  getQuestionsSP,
  getQuestionsIT,
  getQuestionsEC,
  postQuestionsTC,
  postQuestionsSP,
  postQuestionsIT,
  postQuestionsEC
} from "../controller/questionController"

import {
  getSuggesstion,
} from "../controller/suggessionController"

router.get("/user/all", getAllUsers);
router.get("/user", getSingleUser);
router.post("/register", register);
router.post("/login", login)
router.put("/changePassword", changePassword);

router.get("/score/:id", getScoreList);
router.get("/summary/:id", getSummary);
router.put("/score/update/:id", createScore);

router.get("/question/tc", getQuestionsTC);
router.post("/question/tc", postQuestionsTC);
router.get("/question/sp", getQuestionsSP);
router.post("/question/sp", postQuestionsSP);
router.get("/question/it", getQuestionsIT);
router.post("/question/it", postQuestionsIT);
router.get("/question/ec", getQuestionsEC);
router.post("/question/ec", postQuestionsEC);

router.get("/suggesstion/:id", getSuggesstion);


export default router;