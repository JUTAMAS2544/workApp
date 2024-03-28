import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Token, User } from "../entitys/userEntity";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const saltRounds = 10;
const secretKey = "Fullstack-WebApp-Work-2024";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const users = await userRepository.find();
    users && res.send(users);
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

export const getSingleUser = (req: Request, res: Response) => {
  res.send(req.userSingle);
}

export const register = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});

    if (checkUser) return res.send({ status:"error", message: "Email นี้มีผู้ใช้แล้ว" });

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      req.body.password = hash
      const newUser = await userRepository.create(req.body);
      const result = await userRepository.save(newUser);

      result && res.send({ status: "ok", message: "Register Success"});
    });

  } catch (err) {
    res.status(404).send("Register Failed");
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const tokenRepository = await myDataSource.getRepository(Token)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});

    if (!checkUser) return res.send({status:"error", message: "ไม่พบ Email ผู้ใช้" });

    const checkTokens = await tokenRepository.findOne(
      {
        relations: {
          user: true,
        },
        where: {
          user: {
            id: checkUser.id
          }
        }
      });

    bcrypt.compare(req.body.password, checkUser.password, async (err, result) => {
      if (result) {
        if (!checkTokens) {
          var token = jwt.sign({ email: checkUser.email }, secretKey);
          const newToken = await tokenRepository.create({ token: token, userId: checkUser.id });
          const newTokens = await tokenRepository.save(newToken);

          newTokens && res.send({ status:"ok", token });
        } else {
          res.status(403).send({ status:"error", message: "มีผู้ Login เข้าใช้งานแล้ว" });
        }
      } else {
        res.send({ status:"error", message: "รหัสผ่านไม่ถูกต้อง" });
      }
    });

  } catch (err) {
    console.log(err);
    res.status(404).send("Login Failed");
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    if (req.userSingle) {
      const tokenRepository = await myDataSource.getRepository(Token)
      const checkToken = await tokenRepository.findOne({ where: { userId: req.userSingle.id }});
      if (!checkToken) res.send({status:"error", message: "ไม่พบ Token ผู้ใช้" });
      const delToken = await tokenRepository
        .createQueryBuilder()
        .delete()
        .from(Token)
        .where("userId = :id", { id: req.userSingle.id })
        .execute();
      delToken && res.send({ status:'ok', message:'Token deleted successfully'})
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Logout Failed");
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});
    if (!checkUser) return res.send({ status:"error", message: "ไม่พบ Email ผู้ใช้" });

    bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
      req.body.newPassword = hash
      const updatePassword = await userRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: req.body.newPassword })
        .where("email = email", { email: req.body.email })
        .execute();
      if (updatePassword) return res.send({ status:"ok", message: "เปลี่ยนรหัสผ่านสำเร็จแล้ว" })
      else return res.send({ status:"error", message: "ไม่สามารถเปลี่ยนรหัสผ่านได้" })
    });

  } catch (err) {
    console.log(err);
    res.status(404).send("Change Password Failed");
  }
}


// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = await myDataSource.getRepository(user);

//     const checkUser = await userRepository.findOne({ where: { id: Number(req.body.id) }});
//     if (!checkUser) return res.status(404).send("ไม่มีผู้ใช้");

//     userRepository.merge(checkUser, req.body);
//     const result = await userRepository.save(checkUser);

//     result && res.send("แก้ไขข้อมูลสำเร็จ");
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

// export const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1]
//       const decoded = jwt.verify(token, secretKey) as JwtPayload;
//       if (decoded && typeof decoded === 'object' && 'email' in decoded) {
//         const userRepository = await myDataSource.getRepository(User)
//         const userSingle = await userRepository.findOne({ where: { email: decoded.email.toString()}});
//         res.send(userSingle);
//       } else {
//         res.send({ status:"error", message: "Invalid token" });
//         // throw new Error('Invalid token');
//       }
//     } else {
//       res.send({ status:"error", message: "Not Found" });
//     }
//   } catch (err) {
//     res.status(404).send({ message: err });
//   }
// }