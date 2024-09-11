import { Request, Response, NextFunction } from "express";

export async function logoutRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Assuming you're using express-session

    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    next(error);
  }
}
