const database = require('../models');
// utilizando os operadores do sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    //vamos pegar estes dados com base nos query string passados nas rotas
    const{ data_inicial, data_final } = req.query;
    const where = {};
    
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaTurma(req, res){
    const { id } = req.params;
    try{
      const umaTurma = await database.Turmas.findOne( 
        {
          where:{ 
            id: Number(id) 
          }
        }
      );
      return res.status(200).json(umaTurma);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async criarTurma(req, res){
    const novaTurma = req.body;
    try{
      const novaTurmaCriada = await database.Turmas.create(novaTurma);
      return res.status(200).json(novaTurmaCriada);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async atualizarTurma(req, res){
    const { id } = req.params;
    const novasInfo = req.body;
    try{
      await database.Turmas.update(novasInfo,
      {
        where: {
          id: Number(id)
        }
      });

      const turmaAtualizada = await database.Turmas.findOne({
        where: {
          id: Number(id)
        }
      }) 

      return res.status(200).send([
        {
          statusCode: 200,
          mensagem: "Turma atualizada com sucesso"
        }, 
        turmaAtualizada
      ]);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async deletarTurma(req, res){
    const { id } = req.params;
    try{
      await database.Turmas.destroy({
          where:{ 
            id: Number(id) 
          }
        }
      );
      return res.status(200).send({
        statusCode: 200,
        mensagem: "Turma apagada com sucesso"
      });
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
      await database.Turmas.restore( {where: { id: Number(id) } } )
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = TurmaController;