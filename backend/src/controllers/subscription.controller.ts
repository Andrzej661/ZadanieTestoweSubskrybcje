import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../client";
import { DecodedToken } from "../middleware/auth.middleware"; // Ensure this path is correct

export class SubscriptionController {
  // Function to get all subscriptions
  private static extractJWT(req: Request): string | null {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }

  static async getAllSubscriptions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Fetch all subscriptions from the database
      const subscriptions = await prisma.subscription.findMany();

      // Return the fetched subscriptions
      res.status(200).json({
        status: true,
        message: "Subscriptions fetched successfully",
        data: subscriptions,
      });
    } catch (error) {
      // Pass the error to the global error handler
      next(error);
    }
  }

  static buySubscription = async (req: Request, res: Response) => {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ message: "Subscription ID is required" });
    }

    try {
      if (typeof subscriptionId !== "string") {
        return res
          .status(400)
          .json({ message: "Invalid subscription ID format" });
      }

      // Find the subscription by ID
      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Extract token from the request
      const token = SubscriptionController.extractJWT(req);
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      // Verify and decode the token
      let decoded: DecodedToken;
      try {
        decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as DecodedToken;
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
      }

      const userId = decoded.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Find the user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's subscription
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscription: {
            connect: { id: subscriptionId },
          },
        },
      });

      res.status(200).json({ message: "Subscription purchased successfully" });
    } catch (error) {
      console.error("Error purchasing subscription:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  static getUserSubscription = async (req: Request, res: Response) => {
    try {
      // Extract token from the request
      const token = SubscriptionController.extractJWT(req);
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      // Verify and decode the token
      let decoded: DecodedToken;
      try {
        decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as DecodedToken;
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
      }

      const userId = decoded.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Find the user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true }, // Fetch the user's subscription
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user's subscription or null if no subscription is found
      const subscription = user.subscription || null;

      res.status(200).json({
        status: true,
        message: "User subscription fetched successfully",
        data: subscription,
      });
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static clearAllSubscriptions = async (req: Request, res: Response) => {
    try {
      // Extract token from the request
      const token = SubscriptionController.extractJWT(req);
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      // Verify and decode the token
      let decoded: DecodedToken;
      try {
        decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as DecodedToken;
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
      }

      const userId = decoded.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Find the user by ID and include the subscription
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has any subscriptions
      if (user.subscription) {
        // Disconnect all subscriptions from the user
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscription: {
              disconnect: true,
            },
          },
        });
      }

      res
        .status(200)
        .json({ message: "All subscriptions cleared successfully" });
    } catch (error) {
      console.error("Error clearing subscriptions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
