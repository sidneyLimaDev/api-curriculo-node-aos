import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const ferramenta = await req.context.models.Ferramenta.findAll();

        ferramenta.length > 0? res.send(ferramenta) : res.status(404).send({ status: 404, message: 'Não foi encontrado nenhum dado' });

    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

router.post("/:id", async (req, res) => {
    try {
        const ferramenta = await req.context.models.ferramenta.create({
            nome: req.body.nome,
            curriculoId: req.params.id
        });

        return res.send(ferramenta);
    } catch (err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const ferramenta = await req.context.models.Ferramenta.findByPk(req.params.id);
        ferramenta.update({
            nome: req.body.nome,
        });
    } catch(err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const ferramenta = await req.context.models.Ferramenta.findByPk(req.params.id);
        ferramenta.destroy();
    } catch (err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
})



export default router;