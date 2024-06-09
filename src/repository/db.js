import 'dotenv/config';
import { Sequelize } from 'sequelize';
import getInformacoesPessoaisRepository from './informacoesPessoaisRepository';
import getCurriculoRepository from './curriculoRepository';
import getExperienciaProfissional from './experienciaProfissionalRepository';
import getFormacaoAcademica from './formacaoAcademicaRepository';
import getIdiomas from './idiomaRepository';
import getFerramentas from './ferramentaRepository';

const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(name, user, password, {
    dialect: "postgres",
    host: host,
});

const models = {
    InformacoesPessoais: getInformacoesPessoaisRepository(sequelize, Sequelize),
    Curriculo: getCurriculoRepository(sequelize, Sequelize),
    ExperienciaProfissional: getExperienciaProfissional(sequelize, Sequelize),
    FormacaoAcademica: getFormacaoAcademica(sequelize, Sequelize),
    Idioma: getIdiomas(sequelize, Sequelize),
    Ferramenta: getFerramentas(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
      models[key].associate(models);
    }
  });

export default models;
export { sequelize }
