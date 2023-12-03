const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op, Sequelize } = require('sequelize');


class UsuariosService {

  constructor() {}

  async create(data) {
    try {
    data.created_by = 1;
    await models.Usuarios.create(data);
    const successMessage = 'Usuario created successfully';
      return { message: successMessage };
    } catch (error) {
      throw boom.badRequest('Error creating pet race really exist', error);
    }
  }

  async find(page, pageSize, filters = {}) {
    try {
      const whereClause = {
        deleted: false,
      };

      if (filters.name) {
        whereClause.name = {
          [Op.iLike]: `%${filters.name}%`,
        };
      }


      if (filters.apellido) {
        whereClause.apellido = {
          [Op.iLike]: `%${filters.apellido}%`,
        };
      }

      if (filters.created_at) {
        whereClause.created_at = Sequelize.literal(`to_char("created_at", 'YYYY-MM-DD HH24:MI') ILIKE '%${filters.created_at}%'`);
      }
      const queryOptions = {
        where: whereClause,
        order: [
          ['name', 'ASC']
        ]
      };

      // if (filters.name) {
      //   queryOptions.where.name = Sequelize.where(
      //     Sequelize.fn('unaccent', Sequelize.col('name')),
      //     {
      //       [Op.iLike]: `%${filters.name}%`,
      //     }
      //   );
      // }


      const offset = (page - 1) * pageSize;
      queryOptions.limit = pageSize;
      queryOptions.offset = offset;

      const usuarios = await models.Usuarios.findAll(queryOptions);

      let recordsFound = true;

      if (usuarios.length===0){
        recordsFound = false;
      }

      const totalItems = await models.Usuarios.count(queryOptions);

      const totalPages = Math.ceil(totalItems / pageSize);

      const response = {
        data: usuarios,
        totalPages: totalPages,
        recordsFound: recordsFound, // Incluye esta variable en la respuesta
        message: recordsFound ? 'Registros encontrados.' : 'No se encontraron registros.', // Mensaje descriptivo
      };

      return response;
    } catch (error) {
      throw boom.badRequest('Error finding product categories', error);
    }
  }

  async findOne(id) {
    const user = await models.Usuarios.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }


  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.update({ deleted: true, deleted_at: new Date() });
    return { id };
  }

}

module.exports = UsuariosService;
