import { z } from "zod";

const passwordSchema = z.string();
// .min(8, "Password must be at least 8 characters long")
// .max(100, "Password must be less than 100 characters long")
// .regex(/[a-z]/, "Password must contain at least one lowercase letter")
// .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
// .regex(/\d/, "Password must contain at least one number")
// .regex(/[\W_]/, "Password must contain at least one special character (e.g. @, #, $, %, etc.)");
export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: passwordSchema,
    // phoneNumber: z.string().regex(/^\d+$/),
    // gender: z.enum(["male", "female", "others"]),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

export const updateUserSchema = createUserSchema.partial(); //creates a partial schema from createUserSchema were all properties are optional

export const login = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const logout = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});
