import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const idioma = await req.context.models.Idioma.findAll();

        idioma.length > 0? res.send(idioma) : res.status(404).send({ status: 404, message: 'Não foi encontrado nenhum dado' });

    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

router.post("/:id", async (req, res) => {
    try {
        const idioma = await req.context.models.Idioma.create({
            nome_idioma: req.body.nome_idioma,
            curriculoId: req.params.id
        });

        return res.send(idioma);
    } catch (err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const idioma = await req.context.models.Idioma.findByPk(req.params.id);
        idioma.update({
            nome_idioma: req.body.nome_idioma,
        });

        return res.send(idioma);
    } catch(err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const idioma = await req.context.models.Idioma.findByPk(req.params.id);
        idioma.destroy();

        res.sendStatus(204);
    } catch (err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
})



export default router;