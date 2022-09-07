import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database";

class House extends Model {
  declare id: string;
  declare price: number;
  declare image: string;
  declare lat: number;
  declare lng: number;
  declare area: number;
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    area: { type: DataTypes.FLOAT, allowNull: false },
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
