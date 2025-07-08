import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`server is running at port : ${port}`);
    });

    server.on("error", (error) => {
      console.log("server error ", error);
      throw error;
    });
  })

  .catch((err) => {
    console.log("MongoDB Connection Failed ", err);
  });
