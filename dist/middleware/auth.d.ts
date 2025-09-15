import type { NextFunction, Request, Response } from "express";
export declare const JWT_SECRET = "my_super_secret_key";
export declare const authMiddleware: {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
    unless: typeof import("express-unless").unless;
};
export declare const jwtErrorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map