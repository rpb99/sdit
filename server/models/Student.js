module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define(
        "Student",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            nis: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nama: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tempat_lahir: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tgl_lahir: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            jenis_kelamin: {
                type: DataTypes.ENUM,
                values: ['P', 'L'],
                allowNull: false,
            },
            telepon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alamat: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            foto: DataTypes.TEXT,
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
            tableName: "siswa",
            timestamps: true,
        }
    );

    Student.associate = models => {
        Student.hasMany(models.SekolahAsal, { foreignKey: "id_siswa" })
    }


    return Student;
};
