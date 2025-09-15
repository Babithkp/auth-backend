import type { NextFunction, Request, Response } from "express";import { expressjwt, UnauthorizedError } from "express-jwt";

export const JWT_SECRET = "my_super_secret_key";

export const authMiddleware = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    if (req.cookies?.token) {
      return req.cookies.token;
    }
    return null;
  },
});

export const jwtErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      message: "Unauthorized - invalid or missing token",
    });
    return;
  }
  next(err);
};
