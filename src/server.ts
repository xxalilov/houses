import { app } from "./app";
import { db } from "./services/postgres";

const start = async () => {
  // Connect DATABASE
  await db();

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

start();
