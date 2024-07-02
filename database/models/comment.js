import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import userModel from "./users.js";
import postModel from "./posts.js";

const commentModel = sequelize.define('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

commentModel.belongsTo(postModel, { onDelete: 'cascade', onUpdate: "cascade" });
postModel.hasMany(commentModel);

commentModel.belongsTo(userModel, { onDelete: 'cascade', onUpdate: "cascade" });
userModel.hasMany(commentModel);

export default commentModel