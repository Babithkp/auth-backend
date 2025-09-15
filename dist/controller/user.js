import { PrismaClient } from "@prisma/client";
import { usedSignInSchema, usedSignUpSchema } from "../utils/types.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../middleware/auth.js";
import Jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const SignupUser = async (req, res) => {
    const data = usedSignUpSchema.safeParse(req.body);
    console.log(data);
    if (data.success === false) {
        res.status(400).json({
            message: "invalid data",
        });
        return;
    }
    const { email, name, password } = data.data;
    try {
        const isExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (isExist) {
            res.status(201).json({
                message: "email already exist",
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(200).json({
            message: "signup success",
        });
    }
    catch (error) {
        res.status(400).json({
            message: "signup failed",
            error: error,
        });
    }
};
export const LoginUser = async (req, res) => {
    const data = usedSignInSchema.safeParse(req.body);
    if (data.success === false) {
        res.status(400).json({
            message: "invalid data",
        });
        return;
    }
    const { email, password } = data.data;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(202).json({
                message: "email not found",
            });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(201).json({
                message: "password not correct",
            });
            return;
        }
        const token = Jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({
            message: "login success",
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "login failed",
            error: error,
        });
    }
};
export const GetUser = async (req, res) => {
    const userId = req.auth?.id;
    console.log(userId);
    try {
        const user = await prisma.user.findMany();
        res.status(200).json({
            message: "user found",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "user not found",
            error: error,
        });
    }
};
//# sourceMappingURL=user.js.map