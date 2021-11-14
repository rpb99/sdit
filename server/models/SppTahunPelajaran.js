const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const SppTahunPelajaran = sequelize.define(
    "SppTahunPelajaran",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING(100),
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
      tableName: "spp_tahun_pelajaran",
      timestamps: true,
    }
  );

  SppTahunPelajaran.beforeCreate((item) => (item.id = uuidv4()));

  SppTahunPelajaran.associate = (models) => {
    SppTahunPelajaran.hasMany(models.SppJenisSPP, { foreignKey: "tp_id" });
  };

  return SppTahunPelajaran;
};
