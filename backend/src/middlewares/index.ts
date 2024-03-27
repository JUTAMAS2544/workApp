import { Request, Response, NextFunction  } from "express";
import { myDataSource } from "../../app-data-source";
import { Token, User } from "../entitys/userEntity";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userSingle?: User; // ประกาศคุณสมบัติ userSingle ใน Request
    }
  }
}

const secretKey = "Fullstack-WebApp-Work-2024";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let auth = req.headers.authorization
    const userRepository = await myDataSource.getRepository(User)
    const tokenRepository = await myDataSource.getRepository(Token)
    if (auth) {
      const token = auth.split(" ")[1]
      const checkTokens = await tokenRepository.findOne({ where: { token: token} });

      if (checkTokens) {
        const userSingle = await userRepository.findOne({ where: { id: checkTokens.userId }});
        req.userSingle = userSingle as User;
        next();

      } else {
        res.status(401).send('You are not logged in')
      }

    } else {
      res.status(401).send('You are not logged in')
    }
  } catch (err) {
    console.log(err);
  }
}