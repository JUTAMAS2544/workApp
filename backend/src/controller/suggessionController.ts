import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Suggesstion } from "../entitys/suggessionEntity";
import { Summary } from "../entitys/scoreEntity";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const getSuggesstion = async (req: Request, res: Response) => {
  try {
    const suggesstionRepository = await myDataSource.getRepository(Suggesstion);
    const summaryRepository = await myDataSource.getRepository(Summary);
    const summary = await summaryRepository.findOne({
      where: { userId: Number(req.params.id) },
    });

    if (summary) {
      const suggesstions = await suggesstionRepository.find({
        where: [
          {
            topic:
              "Index of digital agrifood technologies influencing on consumer perceived value and purchase intention",
            lower: LessThanOrEqual(summary.score),
            upper: MoreThanOrEqual(summary.score),
          },
          {
            topic: "Traceability and certification adoption",
            lower: LessThanOrEqual(summary.tc_4),
            upper: MoreThanOrEqual(summary.tc_4),
          },
          {
            topic: "Smart packaging technology adoption",
            lower: LessThanOrEqual(summary.sp_1),
            upper: MoreThanOrEqual(summary.sp_1),
          },
          {
            topic: "IoT sensor in quality and safety control adoption",
            lower: LessThanOrEqual(summary.it_3),
            upper: MoreThanOrEqual(summary.it_3),
          },
          {
            topic: "Agrifood E-Commerce technology adoption",
            lower: LessThanOrEqual(summary.ec_4),
            upper: MoreThanOrEqual(summary.ec_4),
          },
        ],
      });

      suggesstions && res.send({suggesstions, tc: summary.tc_4, sp: summary.sp_1, it: summary.it_3, ec: summary.ec_4, score: summary.score});
    } else {
      res.status(404).send({ message: "Summary not found" });
    }
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

// export const postSuggesstion = async (req: Request, res: Response) => {
//   try {
//     const suggesstionRepository = await myDataSource.getRepository(Suggesstion);
//     const newSuggesstion = await suggesstionRepository.create(req.body);
//     const result = await suggesstionRepository.save(newSuggesstion);

//     result && res.send({ status: "ok", message: "Success" });
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// };
