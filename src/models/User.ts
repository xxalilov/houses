import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database";
import { Password } from "../services/password";

class User extends Model {
  declare id: string;
  declare name: string;
  declare phone: number;
  declare email: string;
  declare password: string;
  declare isAdmin: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.beforeCreate(async (user, option) => {
  const hashedPassword = await Password.toHash(user.password);
  user.password = hashedPassword;
});

export { User };
