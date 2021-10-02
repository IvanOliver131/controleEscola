'use strict';

// Aqui onde populamos com dados de Exemplos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'John Doe',
        ativo: true,
        email: 'john@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ana',
        ativo: true,
        email: 'ana@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Eliana',
        ativo: false,
        email: 'eliana@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Joao',
        ativo: true,
        email: 'joao@gmail.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Lucas',
        ativo: true,
        email: 'lucas@gmail.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
