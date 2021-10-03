const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
  constructor(){
    super('Pessoas');
    this.matriculas = new Services('Matriculas');
  }
  
  //metodos expecificos do controlador de Pessoas
  async pegaRegistrosAtivos(where = {}){
    return database[this.nomeDoModelo].scope('ativos').findAll({where: { ...where }});
  }

  async pegaTodosOsRegistros(where = {}){
    return database[this.nomeDoModelo].scope('todos').findAll({where: { ...where }});
  }

  async cancelaPessoaEhMatriculas(estudanteId){
    return database.sequelize.transaction(async transacao => {
      await super.atualizaRegistro({ativo: false}, estudanteId, {transaction: transacao})
      await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, {transaction: transacao})
    })
  }
}

module.exports = PessoasServices;