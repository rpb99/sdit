const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const SppJenisSPP = sequelize.define(
    "SppJenisSPP",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nominal: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      keterangan: DataTypes.STRING(100),
      tp_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "spp_jenis_spp",
      timestamps: true,
    }
  );

  SppJenisSPP.beforeCreate((item) => (item.id = uuidv4()));

  SppJenisSPP.associate = (models) => {
    SppJenisSPP.belongsTo(models.SppTahunPelajaran, { foreignKey: "tp_id" });
  };

  return SppJenisSPP;
};
