module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Meat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    tastes_like: DataTypes.STRING,
    is_tasty: DataTypes.BOOLEAN
  });
};