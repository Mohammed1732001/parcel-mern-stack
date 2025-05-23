

// App router

import conectDB from "../DB/conniction.js"
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import parcelRouter from "./modules/parcel/parcel.router.js";

const initApp = (app, express) => {
  // Parse incoming JSON
  app.use(express.json());

  // Connect to database before routes
  conectDB();

  // Mount routers
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/parcel", parcelRouter);

  // Fallback route
  app.all("*", (req, res) => {
    res.status(404).json({ message: "ERROR 404 - Page Not Found" });
  });
};

export default initApp;
