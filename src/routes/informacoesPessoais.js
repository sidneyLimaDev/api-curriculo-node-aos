import { Router } from "express"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const informacoesPessoais = await req.context.models.InformacoesPessoais.findAll();
        informacoesPessoais.length > 0 ?  res.send(informacoesPessoais) :  res.status(404).send({status: 404, message: 'Não foi encontrado nenhum dado'})

    } catch (err) {
        return res.status(500).send(err);
    }
    
})

router.post("/:id", async (req, res) => {
    try {
        const informacoesPessoais = await req.context.models.InformacoesPessoais.create({
            email: req.body.email,
            nome_completo: req.body.nome_completo,
            cargo: req.body.cargo,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais,
            curriculoId: req.params.id
        });
    
        return res.send(informacoesPessoais);
    } catch (err) {
        return res.status(400).send({status: 400, message: err.message});
    }
    
})

router.put("/:id", async (req, res) => {
    try {
        const informacoesPessoais = await req.context.models.InformacoesPessoais.findByPk(req.params.id);
        informacoesPessoais.update({
            email: req.body.email,
            nome_completo: req.body.nome_completo,
            cargo: req.body.cargo,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais
        });
    
        return res.send(informacoesPessoais);
    }catch (err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
   
})

router.delete("/:id", async (req, res) => {
    try {
        const informacoesPessoais = await req.context.models.InformacoesPessoais.findByPk(req.params.id);
        informacoesPessoais.destroy();
    
        res.sendStatus(204);
    }catch(err) {
        return res.status(404).send({status: 404, message: `ID: ${req.params.id} inexistente na nossa base de dados.`});
    }
});

export default router;

