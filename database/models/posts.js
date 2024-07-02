import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import userModel from "./users.js";

const postModel = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

postModel.belongsTo(userModel, { onDelete: 'cascade', onUpdate: "cascade" });
userModel.hasMany(postModel)

export default postModel