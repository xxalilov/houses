import { DatabaseConnectionError } from "../errors/database-connection-error";
import { sequelize } from "./database";

const db = async function () {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

export { db };
