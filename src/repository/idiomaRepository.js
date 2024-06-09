const getIdiomas = (sequelize, {DataTypes}) => {
    const Idioma = sequelize.define("idiomas", {
        nome_idioma: {
            type: DataTypes.STRING,
        }
    });

    Idioma.associate = (models) => {
        Idioma.belongsTo(models.Curriculo);
    }

    return Idioma;
}

export default getIdiomas;