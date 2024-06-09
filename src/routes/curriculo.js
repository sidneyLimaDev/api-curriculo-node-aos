import { Router } from 'express';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const curriculo = await req.context.models.Curriculo.findAll({
            include: [
                req.context.models.InformacoesPessoais,
                req.context.models.ExperienciaProfissional,
                req.context.models.Ferramenta,
                req.context.models.FormacaoAcademica,
                req.context.models.Idioma
            ]
        });
        
        curriculo.length > 0 ? res.send(curriculo) : res.status(404).send({status: 404, message: "Nenhum currículo encontrado"})
    } catch(err) {
        return res.status(500).send({status: 500, message: err.message});
    }
    
}) 

router.get("/:id", async (req, res) => {
    try {
        const curriculo = await req.context.models.Curriculo.findOne({
            where: {id: req.params.id},
            include: [
                req.context.models.InformacoesPessoais,
                req.context.models.ExperienciaProfissional,
                req.context.models.Ferramenta,
                req.context.models.FormacaoAcademica,
                req.context.models.Idioma
            ]
        });
        
        curriculo !== null ? res.send(curriculo) : res.status(404).send({status: 404, message: "Nenhum currículo encontrado"})
    } catch(err) {
        return res.status(500).send({status: 500, message: err.message});
    }
    
}) 

router.post("/", async (req, res) => {
    try {
        const curriculo = await req.context.models.Curriculo.create();

        const informacoesPessoais = await req.context.models.InformacoesPessoais.create({
            email: req.body.informacoesPessoais.email,
            nome_completo: req.body.informacoesPessoais.nome_completo,
            cargo: req.body.informacoesPessoais.cargo,
            cidade: req.body.informacoesPessoais.cidade,
            estado: req.body.informacoesPessoais.estado,
            pais: req.body.informacoesPessoais.pais,
            curriculoId: curriculo.id,
        });

        req.body.experienciasProfissionais.forEach(async experiencia => {
            await req.context.models.ExperienciaProfissional.create({
                descricao: experiencia.descricao,
                curriculoId: curriculo.id,
            })
        })

        req.body.ferramentas.forEach(async ferramenta => {
                await req.context.models.Ferramenta.create({
                nome: ferramenta.nome,
                curriculoId: curriculo.id,
            })
        })

        req.body.formacoesAcademicas.forEach(async formacaoAcademica => {
            await req.context.models.FormacaoAcademica.create({
                nome_curso: formacaoAcademica.nome_curso,
                instituicao: formacaoAcademica.instituicao,
                mes_ano_inicio: formacaoAcademica.mes_ano_inicio,
                mes_ano_conclusao: formacaoAcademica.mes_ano_conclusao,
                curriculoId: curriculo.id,
            })
        })

        req.body.idiomas.forEach(async idioma => {
            await req.context.models.Idioma.create({
                nome_idioma: idioma.nome_idioma,
                curriculoId: curriculo.id,
            })
        });

        res.send(curriculo);

    }catch(err) {
        res.status(400).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const curriculo = await req.context.models.Curriculo.findByPk(req.params.id);
        curriculo.destroy();

        res.sendStatus(204);

    }catch(err) {
        res.status(400).send(err.message);
    }
})

export default router;

