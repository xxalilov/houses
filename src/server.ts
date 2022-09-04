import { app } from "./app";
import { db } from "./services/postgres";

const start = async () => {
  // Connect DATABASE
  await db();

  const server = app.listen(3000, () => {
    console.log(`Listening on port ${3000}`);
  });

  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

start();
