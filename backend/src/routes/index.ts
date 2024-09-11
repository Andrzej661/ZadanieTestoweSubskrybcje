import { Router } from "express";
import userRoute from "./user.routes";
import loginRoute from "./login.routes"; // Import your login route
import subscriptionRoute from "./subscription.routes";
// import { logoutRoute } from "./logout.routes";
// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "Hello World" });
});

indexRoute.use("/register", userRoute);
indexRoute.use("/login", loginRoute); // Mount the login route
indexRoute.use("/subscriptions", subscriptionRoute);
// indexRoute.use("logout", logoutRoute);
export default indexRoute;
