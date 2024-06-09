const getFormacaoAcademica = (sequelize, {DataTypes}) => {
    const FormacaoAcademica = sequelize.define("formacoes_academicas", {
        nome_curso: {
            type: DataTypes.STRING,
        },
        instituicao: {
            type: DataTypes.STRING,
        },
        mes_ano_inicio: {
            type: DataTypes.STRING,
        },
        mes_ano_conclusao: {
            type: DataTypes.STRING,
        },
    });

    FormacaoAcademica.associate = (models) => {
        FormacaoAcademica.belongsTo(models.Curriculo);
    }

    return FormacaoAcademica;
}

export default getFormacaoAcademica;