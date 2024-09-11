import { Router } from "express";

import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import {
  createUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { validateSchema } from "../validation/validation.middleware";

// Users layout Route
const userRoute = Router();

userRoute.post("", validateSchema(createUserSchema), createUser);
userRoute.get("/:userid", getUser);
userRoute.patch("/:userid", validateSchema(updateUserSchema), updateUser);

// userRoute.get("", getUsers);
// userRoute.delete("/:userid", deleteUser);

export default userRoute;
