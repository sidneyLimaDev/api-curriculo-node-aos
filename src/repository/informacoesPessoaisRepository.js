const getInformacoesPessoaisRepository = (sequelize, { DataTypes}) => {
    const InformacoesPessoais = sequelize.define("informacaos_pessoais", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        nome_completo: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cargo: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cidade: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        estado: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pais: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });

    InformacoesPessoais.associate = (models) => {
        InformacoesPessoais.belongsTo(models.Curriculo);
    }
    
    InformacoesPessoais.findByEmail = async (user) => {
        let informacoesPessoais =  await InformacoesPessoais.findOne({
            where:  {email: user},
        });

        return informacoesPessoais;
    }
    return InformacoesPessoais;
}

export default getInformacoesPessoaisRepository;

