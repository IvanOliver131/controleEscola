// const database = require('../models');
// const Sequelize = require('sequelize');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {
  static async pegaPessoasAtivas(req, res){
    try{
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaTodasAsPessoas(req, res){
    try{
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaPessoa(req, res){
    const { id } = req.params;
    try{
      const umaPessoa = await database.Pessoas.findOne( 
        {
          where:{ 
            id: Number(id) 
          }
        }
      );
      return res.status(200).json(umaPessoa);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async criarPessoa(req, res){
    const novaPessoa = req.body;
    try{
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async atualizarPessoa(req, res){
    const { id } = req.params;
    const novasInfos = req.body;
    try{
      await database.Pessoas.update(novasInfos,
      {
        where: {
          id: Number(id)
        }
      });

      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      }); 

      return res.status(200).json([
        {
          statusCode: 200,
          mensagem: "Pessoa atualizada com sucesso"
        }, 
        pessoaAtualizada
      ]);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async deletarPessoa(req, res){
    const { id } = req.params;
    try{
      await database.Pessoas.destroy({
          where:{ 
            id: Number(id) 
          }
        }
      );
      return res.status(200).send({
        statusCode: 200,
        mensagem: "Pessoa apagada com sucesso"
      });
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async restauraPessoa(req, res){
    const { id } = req.params;
    try{
      await database.Pessoas.restore({
        where: {
          id: Number(id)
        }
      });
      
      return res.status(200).json({
        statusCode: 200,
        mensagem: `id ${id} foi restaurado`
      })
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  // MATRICULAS SÃO VINCULADAS SEMPRE A UMA PESSOA
  static async pegaUmaMatricula(req, res){
    const { estudanteId } = req.params;
    const { matriculaId } = req.params;
    try{
      const umaMatricula = await database.Matriculas.findOne( 
        {
          where:{ 
            id: Number(matriculaId),
            estudante_id: Number(estudanteId) 
          }
        }
      );
      return res.status(200).json(umaMatricula);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async criarUmaMatricula(req, res){
    const { estudanteId } = req.params;
    const novaMatricula = {...req.body, estudante_id: Number(estudanteId)};
    try{
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async atualizarMatricula(req, res){
    const { estudanteId } = req.params;
    const { matriculaId } = req.params;
    const novasInfo = req.body;
    try{
      await database.Matriculas.update(novasInfo,
      {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });

      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId)
        }
      }) 

      return res.status(200).send([
        {
          statusCode: 200,
          mensagem: "Matricula atualizada com sucesso"
        }, 
        matriculaAtualizada
      ]);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async deletarMatricula(req, res){
    const { estudanteId } = req.params;
    const { matriculaId } = req.params;
    try{
      await database.Matriculas.destroy({
          where:{ 
            id: Number(matriculaId),
            estudante_id: Number(estudanteId) 
          }
        }
      );
      return res.status(200).send({
        statusCode: 200,
        mensagem: "Matricula apagada com sucesso"
      });
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculas(req, res){
    const { estudanteId } = req.params;
    try{
      const pessoa = await database.Pessoas.findOne({
          where:{ 
            id: Number(estudanteId) 
          }
        }
      );
      const matriculas = await pessoa.getAulasMatriculadas();
      
      return res.status(200).json(matriculas)
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res){
    const { turmaId } = req.params;
    try{
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: 'confirmado',
        },
        //limit limita a quantidade de registros que recebe
        limit: 2,
        //ordena os registros que recebe EX: DESC(descendente), ASC(ascendente)
        order: [['estudante_id', 'ASC']]
      });
      
      return res.status(200).json(todasAsMatriculas);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res){
    const lotacaoTurma = 2;
    try{
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: 'confirmado'
        },
        attributes: ['turma_id'],
        group: ['turma_id'],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
      })
      
      return res.status(200).json(turmasLotadas);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async cancelaPessoa(req, res){
    const { estudanteId } = req.params;
    try{      
      await pessoasServices.cancelaPessoaEhMatriculas(Number(estudanteId));

      return res.status(200).json({
        statusCode: 200,
        mensagem: `Matriculas ref. estudante ${estudanteId} canceladas`
      });
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController;