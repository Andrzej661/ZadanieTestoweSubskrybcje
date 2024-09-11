import Express, { NextFunction, Request, Response } from "express";
import indexRoute from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = Express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(Express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", indexRoute);
// app.use("/login", indexRoute);

/* Error Handler */
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({
    status: false,
    message: "An error occurred",
    error,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = process.env.DATABASE_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
