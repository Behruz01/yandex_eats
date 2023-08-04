import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../models/User";
import { send } from "../utils/email.service";
import { createClient } from "redis";
import { signToken } from "../utils/jwt";
import Order from "../../models/Order";

// Ishlatishdan oldin Redisni yoqish kerak
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phoneNumber, address, latitude, longitude } =
      req.body;
    await User.create({
      name,
      email,
      password,
      phoneNumber,
      address,
      latitude,
      longitude,
    });
    const code: number = Math.floor(100000 + Math.random() * 900000);

    const client = createClient();

    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();

    await client.set("code", code);
    await client.set("email", email);

    client.expire("code", 180);
    client.expire("email", 180);
    const mailData = {
      from: "ibragimovbehruz822@gmail.com",
      to: email,
      subject: "Ro'yxatdan o'tish uchun",
      text: "Assalomu alaykum hurmatli mijoz.",
      html: `<b>Iltimos tasdiqlash kodingizni kiriting </b>
        <br>Sizning tasdiqlash kodingiz: ${code} <br/>`,
    };
    await send(mailData);

    await client.disconnect();

    res.status(201).json({ message: "SMS sent to your Email" });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};

// Login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ where: { email } });
    if (
      userEmail?.dataValues.email !== email &&
      userEmail?.dataValues.password !== password
    ) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const id = userEmail?.dataValues.id;

    const token = signToken({ id: id });

    res.status(200).json({ message: "Success", token });
  } catch (error) {
    next(error);
  }
};

// get all users
export const getUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await User.findAll();

    res.status(201).json({ data });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};

// verify email
export const verifyEmail: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { verifyCode } = req.body;

    const client = createClient();

    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();

    const email = await client.get("email");
    const code = await client.get("code");

    if (code != verifyCode) {
      return res.status(403).json({ message: "Invalid code" });
    }

    const user = await User.findOne({ where: { email } });
    await User.update(
      { is_verified: true },
      {
        where: {
          email,
        },
      }
    );
    const id = user?.dataValues.id;
    const token = signToken({ id: id });

    res.status(200).json({ message: "Success", token: token });
    await client.disconnect();
  } catch (error) {
    next(error);
  }
};
// update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { balance, latitude, longitude } = req.body;
    const { id } = req.params;

    await User.update({ balance, latitude, longitude }, { where: { id } });

    res.status(203).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// 
interface nom extends Request {
  verifyUser?: number;
  id?: number;
}
export const getStoryUser = async (
  req: nom,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.verifyUser;
    const userOne: any = await Order.findOne({
      where: { user_id: id },
    });
    console.log(userOne === null);
    if (userOne === null) {
      return res.status(401).json({ message: "Siz hali buyurtma bermadingiz" });
    }

    res.status(200).json({ userOne });
  } catch (error) {
    next(error);
  }
};
