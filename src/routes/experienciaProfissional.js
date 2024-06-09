import { Router } from 'express'

const router = Router();

router.get("/", async (req, res) => {
    try {
        const experienciaProfissional = await req.context.models.ExperienciaProfissional.findAll();

        experienciaProfissional.length > 0 ? res.send(experienciaProfissional) : res.status(404).send({status: 404, message: "Nenhuma experiência profissional encontrada"});
    } catch( err) {
        return res.status(500).send({status: 500, message: err.message});
    }
})

router.post("/:id", async(req, res) => {
    try {
        const experienciaProfissional = await req.context.models.ExperienciaProfissional.create({
            descricao: req.body.descricao,
            curriculoId: req.params.id,
        })

        return res.send(experienciaProfissional);

    }catch(err) {
        return res.status(400).send({status: 400, message: err.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const experienciaProfissional = await req.context.models.ExperienciaProfissional.findByPk(req.params.id);
        experienciaProfissional.update({
            descricao: req.body.descricao,
        });

        res.send(experienciaProfissional);
    } catch(err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const experienciaProfissional = await req.context.models.ExperienciaProfissional.findByPk(req.params.id);
        
        experienciaProfissional.destroy();

        return res.status(204).send(experienciaProfissional);
    }catch (err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
})

export default router;