module.exports = (sequelize, DataTypes) => {
    const SekolahAsal = sequelize.define(
        "SekolahAsal",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            id_siswa: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nama: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            surat_pindah: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            alamat: DataTypes.TEXT,
            // tgl_masuk: DataTypes.DATE,
            tgl_keluar: DataTypes.DATE,
            // tingkat: DataTypes.STRING(12),
            survei: DataTypes.STRING(100),
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
            tableName: "sekolah_asal",
            timestamps: true,
        }
    );

    SekolahAsal.associate = models => {
        SekolahAsal.belongsTo(models.Student, { foreignKey: 'id_siswa' })
    }


    return SekolahAsal;
};
