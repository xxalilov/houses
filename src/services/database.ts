import { Sequelize } from "sequelize";

const sequelize = new Sequelize("houses", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

export { sequelize };
