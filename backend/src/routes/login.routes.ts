import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyPassword, generateToken } from "../utils/auth";

const prisma = new PrismaClient();
const loginRoute = Router();

// Login route
loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken(user.id);

    // Send the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      sameSite: "strict", // Adjust based on your needs
    });

    // Respond with user data
    res.status(200).json({
      user: user.email, // Adjust as needed based on your response
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default loginRoute;
