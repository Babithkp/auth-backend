import * as z from "zod";
export const usedSignUpSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
});
export const usedSignInSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20),
});
//# sourceMappingURL=types.js.map