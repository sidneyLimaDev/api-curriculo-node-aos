const getCurriculoRepository = (sequelize, {DataTypes}) => {
    const Curriculo = sequelize.define("curriculos");

    Curriculo.associate = (models) => {
        Curriculo.hasOne(models.InformacoesPessoais, { onDelete: 'CASCADE' });
        Curriculo.hasMany(models.ExperienciaProfissional, { onDelete: 'CASCADE' });
        Curriculo.hasMany(models.FormacaoAcademica, { onDelete: 'CASCADE' });
        Curriculo.hasMany(models.Idioma, { onDelete: 'CASCADE' });
        Curriculo.hasMany(models.Ferramenta, { onDelete: 'CASCADE'});
    }  

    return Curriculo;
}

export default getCurriculoRepository;