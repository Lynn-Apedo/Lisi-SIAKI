'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(
        models.Category,{
          foreignKey: "categoryId",
        }
      );
      this.hasMany(models.Task, {
        foreignKey: "listId"
      })
    }
  };
  List.init({
    listName: DataTypes.STRING,
    subcategoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};