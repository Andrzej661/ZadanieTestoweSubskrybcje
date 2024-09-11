declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string; // Match this with your JWT payload structure
      };
    }
  }
}
