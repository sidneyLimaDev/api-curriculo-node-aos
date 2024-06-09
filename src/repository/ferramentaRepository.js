const getFerramentas = (sequelize, {DataTypes}) => {
    const Ferramenta = sequelize.define("ferramentas", {
        nome: {
            type: DataTypes.STRING,
        }
    })

    Ferramenta.associate = (models) => {
        Ferramenta.belongsTo(models.Curriculo);
    }

    return Ferramenta;
}

export default getFerramentas;