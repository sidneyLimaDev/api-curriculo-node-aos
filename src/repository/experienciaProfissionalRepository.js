const getExperienciaProfissional = (sequelize, { DataTypes}) => {
    const ExperienciaProfissional = sequelize.define("experiencias_profissionais", {
        descricao: {
            type: DataTypes.STRING,
        }
    });

    ExperienciaProfissional.associate = (models) => {
        ExperienciaProfissional.belongsTo(models.Curriculo);
    }

    return ExperienciaProfissional;
}

export default getExperienciaProfissional;