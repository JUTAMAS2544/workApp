import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { User } from "../entitys/userEntity";
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

// export const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = await myDataSource.getRepository(User)
//     const userSingle = await userRepository.findOne({ where: { id: Number(req.params.id)}});

//     userSingle && res.send(userSingle);
//   } catch (err) {
//     console.log(err);
//     res.send("Server error");
//   }
// }

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      if (decoded && typeof decoded === 'object' && 'email' in decoded) {
        const userRepository = await myDataSource.getRepository(User)
        const userSingle = await userRepository.findOne({ where: { email: decoded.email.toString()}});
        res.send(userSingle);
      } else {
        throw new Error('Invalid token');
      }
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (err) {
    res.status(404).send({ message: err });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});

    if (checkUser) return res.status(404).send({ message: "Has User" });

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      req.body.password = hash
      const newUser = await userRepository.create(req.body);
      const result = await userRepository.save(newUser);

      result && res.send({ status: "ok", message: "Register Success"});
    });

  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});

    if (!checkUser) return res.status(404).send({status:"error", message: "Not Found" });

    bcrypt.compare(req.body.password, checkUser.password, async (err, result) => {
      if (result) {
        var token = jwt.sign({ email: checkUser.email }, secretKey, { expiresIn: '2h' });
        res.send({ token });
      } else {
        res.status(404).send({ message: "Login Failed" });
      }
    });

  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(User)
    const checkUser = await userRepository.findOne({ where: { email: req.body.email }});
    if (!checkUser) return res.status(404).send({ message: "No User" });

    bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
      req.body.newPassword = hash
      const updatePassword = await userRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: req.body.newPassword })
        .where("email = email", { email: req.body.email })
        .execute();
      if (updatePassword) return res.send({ message: "Change Password Success" })
      else return res.status(404).send({ message: "Not Change Password" })
    });

  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
}


// bcrypt.compare(req.body.password, checkUser.password, async (err, result) => {
    //   if (result) {
    //     bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
    //       req.body.newPassword = hash
    //       const updatePassword = await userRepository
    //         .createQueryBuilder()
    //         .update(user)
    //         .set({ password: req.body.newPassword })
    //         .where("id = :id", { id: req.params.id })
    //         .execute();
    //       if (updatePassword) return res.send("เปลี่ยนรหัสผ่านสำเร็จ")
    //     });
    //   } else {
    //     return res.send("รหัสผ่านไม่ถูกต้อง")
    //   }
    // });


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