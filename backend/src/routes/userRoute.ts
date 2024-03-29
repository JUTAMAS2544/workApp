import express, { Request, Response } from "express";

const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  register,
  login,
  logout,
  changePassword
} from "../controller/userController"

import {
  getScoreList,
  getSummary,
  createScore,
} from "../controller/scoreController"

import {
  getQuestions
} from "../controller/questionController"

import {
  getSuggesstion,
} from "../controller/suggessionController"
import { isLoggedIn } from "../middlewares";

router.get("/user/all", getAllUsers);
router.get("/user", isLoggedIn, getSingleUser);
router.post("/register", register);
router.post("/login", login)
router.get("/logout", isLoggedIn, logout)
router.put("/changePassword", changePassword);

// router.get("/score/:id", isLoggedIn, getScoreList);
router.get("/score", isLoggedIn, getScoreList);
router.get("/summary", isLoggedIn, getSummary);
// router.put("/score/update/:id", isLoggedIn, createScore);
router.put("/score/update", isLoggedIn, createScore);

router.get("/suggesstion", isLoggedIn, getSuggesstion);

router.get("/question", getQuestions);


export default router;