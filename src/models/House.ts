import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database";

class House extends Model {
  declare id: string;
  declare price: number;
  declare location: number;
  declare address: string;
}

House.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "houses",
    sequelize,
  }
);

export { House };
