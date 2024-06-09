import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {

        const formacaoAcademica = await req.context.models.FormacaoAcademia.findAll();

        formacaoAcademica.length > 0 ? res.send(formacaoAcademica) : res.status(404).send({status: 404, message: 'Não foi encontrado nenhum dado'})

    }catch(err) {
        return res.status(500).send({status: 500, message: err.message});
    }
})

router.post("/:id", async (req, res) => {
    try {
        const formacaoAcademica = await req.context.models.FormacaoAcademica.create({
            nome_curso: req.body.nome_curso,
            instituicao: req.body.instituicao,
            mes_ano_inicio: req.body.mes_ano_inicio,
            mes_ano_conclusao: req.body.mes_ano_conclusao,
            curriculoId: req.params.id
        });

        return res.send(formacaoAcademica);
    } catch (err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const formacaoAcademica = await req.context.models.FormacaoAcademica.findByPk(req.params.id);
        formacaoAcademica.update({
            nome_curso: req.body.nome_curso,
            instituicao: req.body.instituicao,
            mes_ano_inicio: req.body.mes_ano_inicio,
            mes_ano_conclusao: req.body.mes_ano_conclusao
        });

        return res.send(formacaoAcademica)
    } catch(err) {
        return res.status(400).send({status: 400, message: err.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const formacaoAcademica = await req.context.models.FormacaoAcademica.findByPk(req.params.id);
        formacaoAcademica.destroy();

        res.sendStatus(204);
    } catch (err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
})

export default router;