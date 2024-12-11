import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite:data/db.sqlite");

export const Decoration = sequelize.define("Decoration", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

await sequelize.sync();
