import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Question } from "../entitys/questionEntity";

// GET
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questionRepository = await myDataSource.getRepository(Question)
    const questions = await questionRepository.find();
    questions && res.send(questions);
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

// export const getQuestionsSP = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(SP)
//     const questions = await questionRepository.find();
//     questions && res.send(questions[0]);
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const getQuestionsIT = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(IT)
//     const questions = await questionRepository.find();
//     questions && res.send(questions[0]);
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const getQuestionsEC = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(EC)
//     const questions = await questionRepository.find();
//     questions && res.send(questions[0]);
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }


// // POST
// export const postQuestionsTC = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(TC)
//     const newQuestion = await questionRepository.create(req.body);
//     const result = await questionRepository.save(newQuestion);

//     result && res.send({ status: "ok", message: "Success"});
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const postQuestionsSP = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(SP)
//     const newQuestion = await questionRepository.create(req.body);
//     const result = await questionRepository.save(newQuestion);

//     result && res.send({ status: "ok", message: "Success"});
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const postQuestionsIT = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(IT)
//     const newQuestion = await questionRepository.create(req.body);
//     const result = await questionRepository.save(newQuestion);

//     result && res.send({ status: "ok", message: "Success"});
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const postQuestionsEC = async (req: Request, res: Response) => {
//   try {
//     const questionRepository = await myDataSource.getRepository(EC)
//     const newQuestion = await questionRepository.create(req.body);
//     const result = await questionRepository.save(newQuestion);

//     result && res.send({ status: "ok", message: "Success"});
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }



