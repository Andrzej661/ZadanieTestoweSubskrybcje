import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { jwtSecret } from "../config/config";
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
const secret: Secret = jwtSecret as Secret;
// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
}

// Verify JWT token
export function verifyToken(token: string): any {
  return jwt.verify(token, secret);
}
