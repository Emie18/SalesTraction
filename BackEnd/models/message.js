const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_chat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'message',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "message_chat_FK",
        using: "BTREE",
        fields: [
          { name: "id_chat" },
        ]
      },
      {
        name: "message_account0_FK",
        using: "BTREE",
        fields: [
          { name: "id_account" },
        ]
      },
    ]
  });
};
