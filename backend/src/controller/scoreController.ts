import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { ScoreAns, Summary } from "../entitys/scoreEntity";

export const getScoreList = async (req: Request, res: Response) => {
  try {
    if (req.userSingle) {
      // console.log("userId: ", req.userSingle.id)
      const scoreRepository = await myDataSource.getRepository(ScoreAns)
      const scores = await scoreRepository.find({ where: { userId: req.userSingle.id}});

      if (!scores) res.send();
      scores && res.send(scores);
    }
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

export const createScore = async (req: Request, res: Response) => {
  try {
    if (req.userSingle) {
      const scoreRepository = await myDataSource.getRepository(ScoreAns)
      const summaryRepository = await myDataSource.getRepository(Summary)
      const checkScore = await scoreRepository.find({ where: { userId: req.userSingle.id}});

      const scoreData = req.body;

      const summaryTC = await calculateScoreTC(scoreData)
      const summarySP = await calculateScoreSP(scoreData)
      const summaryIT = await calculateScoreIT(scoreData)
      const summaryEC = await calculateScoreEC(scoreData)

      // console.log("ValueTC: ", summaryTC)
      // console.log("ValueSP: ", summarySP)
      // console.log("ValueIT: ", summaryIT)
      // console.log("ValueEC: ", summaryEC)

      // console.log("checkScore : ", checkScore.length)
      if (checkScore.length > 0) {
        // console.log('Score Pass')
        for (let scoreItem of scoreData) {
          const { value, questionId } = scoreItem;
          const updateScore = await scoreRepository
            .createQueryBuilder()
            .update(ScoreAns)
            .set({ value }) // กำหนดค่า value ที่ต้องการอัปเดต
            .where("userId = :userId AND questionId = :questionId", { userId: req.userSingle.id, questionId })
            .execute();

            !updateScore && res.send({ status: "error", message: "Change Score Failed" })
        }
        const updateSummary = await summaryRepository
          .createQueryBuilder()
          .update(Summary)
          .set({
            tc_1: summaryTC[0],
            tc_2: summaryTC[1],
            tc_3: summaryTC[2],
            tc_4: summaryTC[3],
            sp_1: summarySP[0],
            it_1: summaryIT[0],
            it_2: summaryIT[1],
            it_3: summaryIT[2],
            ec_1: summaryEC[0],
            ec_2: summaryEC[1],
            ec_3: summaryEC[2],
            ec_4: summaryEC[3],
            score: calScore([summaryTC[4], summaryTC[5], summarySP[1], summarySP[2], summaryIT[3], summaryIT[4], summaryEC[4], summaryEC[5]])
          })
          .where("userId = :userId", {userId: req.userSingle.id})
          .execute();
          !updateSummary && res.send({ status: "error", message: "Change Summary Failed" })
          updateSummary && res.send({ status: "ok", message: "Change Score and Summary Success" })
      } else {
        // console.log('Score not Pass')
        const ans = await req.body.map((score: ScoreAns) => {
          return {
            userId: req.userSingle?.id,
            value: score.value,
            questionId: score.questionId
          }
        })
        const newScore = await scoreRepository.create(ans)
        const seveNewScore = await scoreRepository.save(newScore)
        if (seveNewScore) {
          const newSummary = await summaryRepository.create({
            userId: req.userSingle.id,
            tc_1: summaryTC[0],
            tc_2: summaryTC[1],
            tc_3: summaryTC[2],
            tc_4: summaryTC[3],
            sp_1: summarySP[0],
            it_1: summaryIT[0],
            it_2: summaryIT[1],
            it_3: summaryIT[2],
            ec_1: summaryEC[0],
            ec_2: summaryEC[1],
            ec_3: summaryEC[2],
            ec_4: summaryEC[3],
            score: calScore([summaryTC[4], summaryTC[5], summarySP[1], summarySP[2], summaryIT[3], summaryIT[4], summaryEC[4], summaryEC[5]])
          })

          const summaryAns = await summaryRepository.save(newSummary)
          summaryAns && res.send({ status: "ok", message: "Create Score and Summary Success"});
        } else {
          res.send({ status: "error", message: "Create Score Failed" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

export const getSummary = async (req: Request, res: Response) => {
  try {
    if (req.userSingle) {
      const summaryRepository = await myDataSource.getRepository(Summary)
      const summary = await summaryRepository.findOne({ where: { userId: req.userSingle.id }});

      if (!summary) res.send([]);
      summary && res.send(summary);
    }
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

// export const getScoreList = async (req: Request, res: Response) => {
//   try {
//     const scoreRepository = await myDataSource.getRepository(ScoreAns)
//     const scores = await scoreRepository.findOne({ where: { userId: Number(req.params.id)}});

//     if (!scores) res.send();
//     scores && res.send(scores);
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const createScore = async (req: Request, res: Response) => {
//   try {
//     const scoreRepository = await myDataSource.getRepository(Score)
//     const summaryRepository = await myDataSource.getRepository(Summary)
//     const checkScore = await scoreRepository.findOne({ where: { userId: Number(req.params.id)}});

//     console.log("Score: ", checkScore)

//     if (checkScore) {
//       const updateScore = await scoreRepository
//         .createQueryBuilder()
//         .update(Score)
//         .set({
//           ans1_tc: req.body.ans1_tc,
//           ans2_tc: req.body.ans2_tc,
//           ans3_tc: req.body.ans3_tc,
//           ans4_tc: req.body.ans4_tc,
//           ans5_tc: req.body.ans5_tc,
//           ans6_tc: req.body.ans6_tc,
//           ans7_tc: req.body.ans7_tc,
//           ans8_tc: req.body.ans8_tc,
//           ans9_tc: req.body.ans9_tc,
//           ans10_sp: req.body.ans10_sp,
//           ans11_sp: req.body.ans11_sp,
//           ans12_sp: req.body.ans12_sp,
//           ans13_it: req.body.ans13_it,
//           ans14_it: req.body.ans14_it,
//           ans15_it: req.body.ans15_it,
//           ans16_it: req.body.ans16_it,
//           ans17_it: req.body.ans17_it,
//           ans18_it: req.body.ans18_it,
//           ans19_it: req.body.ans19_it,
//           ans20_ec: req.body.ans20_ec,
//           ans21_ec: req.body.ans21_ec,
//           ans22_ec: req.body.ans22_ec,
//           ans23_ec: req.body.ans23_ec,
//           ans24_ec: req.body.ans24_ec,
//           ans25_ec: req.body.ans25_ec,
//           ans26_ec: req.body.ans26_ec,
//           ans27_ec: req.body.ans27_ec,
//           ans28_ec: req.body.ans28_ec,
//           ans29_ec: req.body.ans29_ec,
//           ans30_ec: req.body.ans30_ec
//         })
//         .where("userId = :userId", { userId: Number(req.params.id) })
//         .execute();

//       if (updateScore) {
//         const summaryTC = calculateScoreTC(req.body)
//         const summarySP = calculateScoreSP(req.body)
//         const summaryIT = calculateScoreIT(req.body)
//         const summaryEC = calculateScoreEC(req.body)
//         const updateSummary = await summaryRepository
//           .createQueryBuilder()
//           .update(Summary)
//           .set({
//             tc_1: summaryTC[0],
//             tc_2: summaryTC[1],
//             tc_3: summaryTC[2],
//             tc_4: summaryTC[3],
//             sp_1: summarySP[0],
//             it_1: summaryIT[0],
//             it_2: summaryIT[1],
//             it_3: summaryIT[2],
//             ec_1: summaryEC[0],
//             ec_2: summaryEC[1],
//             ec_3: summaryEC[2],
//             ec_4: summaryEC[3],
//             score: calScore([summaryTC[4], summaryTC[5], summarySP[1], summarySP[2], summaryIT[3], summaryIT[4], summaryEC[4], summaryEC[5]])
//           })
//           .where("userId = :userId", {userId: Number(req.params.id)})
//           .execute();
//         if (updateSummary) {
//           res.send({ status: "ok", message: "Change Score Success" })
//         } else {
//           res.status(404).send({ status: "error", message: "Change Summary Failed" })
//         }
//       }
//       else {
//         res.status(404).send({ status: "error", message: "Change Score Failed" })
//       }

//     } else {
//       const newScore = await scoreRepository.create(req.body);
//       const scoreAns = await scoreRepository.save(newScore);

//        if (scoreAns) {
//         const calSummaryTC = calculateScoreTC(req.body)
//         const calSummarySP = calculateScoreSP(req.body)
//         const calSummaryIT = calculateScoreIT(req.body)
//         const calSummaryEC = calculateScoreEC(req.body)
//         const newSummary = await summaryRepository.create({
//           userId: Number(req.params.id),
//           tc_1: calSummaryTC[0],
//           tc_2: calSummaryTC[1],
//           tc_3: calSummaryTC[2],
//           tc_4: calSummaryTC[3],
//           sp_1: calSummarySP[0],
//           it_1: calSummaryIT[0],
//           it_2: calSummaryIT[1],
//           it_3: calSummaryIT[2],
//           ec_1: calSummaryEC[0],
//           ec_2: calSummaryEC[1],
//           ec_3: calSummaryEC[2],
//           ec_4: calSummaryEC[3],
//           score: calScore([calSummaryTC[4], calSummaryTC[5], calSummarySP[1], calSummarySP[2], calSummaryIT[3], calSummaryIT[4], calSummaryEC[4], calSummaryEC[5]])
//         })

//         const summaryAns = await summaryRepository.save(newSummary)
//         summaryAns && res.send({ status: "ok", message: "Send Summary Success"});
//        }

//       // result && res.send({ status: "ok", message: "Send Score Success"});
//     }

//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// }


// คำนวณ
function calculateScoreTC(score: any) {
  const totalRating = [11.65, 12, 11.5]
  const sumTotalRating = 35.15
  const weight = [0.72, 0.8, 0.81, 0.83, 0.82, 0.75, 0.81, 0.79, 0.7]

  // return score[0].value
  var scoreXweight = [
    (score[0].value*weight[0]) + (score[1].value*weight[1]) + (score[2].value*weight[2]),
    (score[3].value*weight[3]) + (score[4].value*weight[4]) + (score[5].value*weight[5]),
    (score[6].value*weight[6]) + (score[7].value*weight[7]) + (score[8].value*weight[8])
  ]

  var sumScoreXweight = 0
  for (let i = 0; i < scoreXweight.length; i++) {
    sumScoreXweight += scoreXweight[i]
  }

  return [
    Math.round((scoreXweight[0]/totalRating[0]*100) * 100) / 100,
    Math.round((scoreXweight[1]/totalRating[1]*100) * 100) / 100,
    Math.round((scoreXweight[2]/totalRating[2]*100) * 100) / 100,
    Math.round((sumScoreXweight/sumTotalRating*100) * 100) / 100,
    sumScoreXweight, sumTotalRating
  ]
}

function calculateScoreSP(score: any) {
  const sumTotalRating = 12.5
  const weight = [0.84, 0.87, 0.79]

  var sumScoreXweight = score[9].value*weight[0] + score[10].value*weight[1] + score[11].value*weight[2]

  return [
    Math.round((sumScoreXweight/sumTotalRating*100) * 100) / 100,
    sumScoreXweight, sumTotalRating
  ]
}

function calculateScoreIT(score: any) {
  const totalRating = [17.35, 12.55]
  const sumTotalRating = 29.9
  const weight = [0.81, 0.88, 0.87, 0.91, 0.86, 0.82, 0.83]
  var scoreXweight = [
    (score[12].value*weight[0]) + (score[13].value*weight[1]) + (score[14].value*weight[2]) + (score[15].value*weight[3]),
    (score[16].value*weight[4]) + (score[17].value*weight[5]) + (score[18].value*weight[6])
  ]

  var sumScoreXweight = 0
  for (let i = 0; i < scoreXweight.length; i++) {
    sumScoreXweight += scoreXweight[i]
  }

  return [
    Math.round((scoreXweight[0]/totalRating[0]*100) * 100) / 100,
    Math.round((scoreXweight[1]/totalRating[1]*100) * 100) / 100,
    Math.round((sumScoreXweight/sumTotalRating*100) * 100) / 100,
    sumScoreXweight, sumTotalRating
  ]
}

function calculateScoreEC(score: any) {
  const totalRating = [12.5, 20.9, 11.5]
  const sumTotalRating = 44.9
  const weight = [0.82, 0.83, 0.85, 0.88, 0.87, 0.86, 0.81, 0.76, 0.81, 0.78, 0.71]
  var scoreXweight = [
    (score[19].value*weight[0]) + (score[20].value*weight[1]) + (score[21].value*weight[2]),
    (score[22].value*weight[3]) + (score[23].value*weight[4]) + (score[24].value*weight[5]) + (score[25].value*weight[6]) + (score[26].value*weight[7]),
    (score[27].value*weight[8]) + (score[28].value*weight[9]) + (score[29].value*weight[10])
  ]

  var sumScoreXweight = 0
  for (let i = 0; i < scoreXweight.length; i++) {
    sumScoreXweight += scoreXweight[i]
  }

  return [
    Math.round((scoreXweight[0]/totalRating[0]*100) * 100) / 100,
    Math.round((scoreXweight[1]/totalRating[1]*100) * 100) / 100,
    Math.round((scoreXweight[2]/totalRating[2]*100) * 100) / 100,
    Math.round((sumScoreXweight/sumTotalRating*100) * 100) / 100,
    sumScoreXweight, sumTotalRating
  ]
}

function calScore(num: [number, number, number, number, number, number, number, number]) {
  // 0.81 = อันใหญ่
  const beta = [0.04, 0.16, 0.43, 0.05, 0.81]
  const sum_beta_a = num[0]*beta[0] + num[2]*beta[1] + num[4]*beta[2] + num[6]*beta[3]
  const sum_beta_b = num[1]*beta[0] + num[3]*beta[1] + num[5]*beta[2] + num[7]*beta[3]

  return Math.round(((sum_beta_a*beta[4])/(sum_beta_b*beta[4])*100) * 100) / 100;
}
