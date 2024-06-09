import express from 'express'
import 'dotenv/config'
import models, {sequelize} from './repository/db';
import { routes } from './routes'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
})

app.use("/informacoesPessoais", routes.informacoesPessoais);
app.use("/curriculo", routes.curriculo);
app.use("/experienciaProfissional", routes.experienciaProfissional);
app.use("/formacaoAcademica", routes.formacaoAcademica);
app.use("/ferramenta", routes.ferramenta);
app.use("/idioma", routes.idioma);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC;

sequelize.sync({force: eraseDatabaseOnSync})

app.get('/', (req, res) => {
  res.send('Hello World! Api Curriculo');
})

app.listen(port, () => {
  console.log(`App Curriculo listen on port ${port}`);
})
