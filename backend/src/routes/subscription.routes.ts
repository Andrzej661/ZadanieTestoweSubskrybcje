import { Router } from "express";
import { SubscriptionController } from "../controllers/subscription.controller";

const subscriptionRoute = Router();

// Route to get all subscriptions
subscriptionRoute.get("/", SubscriptionController.getAllSubscriptions);

// Route to purchase a subscription
subscriptionRoute.post("/purchase", SubscriptionController.buySubscription);

// Route to get the user's subscription
subscriptionRoute.get(
  "/my-subscription",
  SubscriptionController.getUserSubscription
);

// Route to delete a subscription
subscriptionRoute.post("/delete", SubscriptionController.clearAllSubscriptions);

export default subscriptionRoute;
