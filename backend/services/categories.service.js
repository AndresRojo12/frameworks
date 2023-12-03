const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op, Sequelize } = require('sequelize');

class CategoriesService {

  constructor() {}

  async create(data) {
    try {
    data.created_by = 1;
    await models.Categories.create(data);
    const successMessage = 'Category created successfully';
      return { message: successMessage };
    } catch (error) {
      throw boom.badRequest('Error creating category really exist', error);
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


      if (filters.description) {
        whereClause.description = {
          [Op.iLike]: `%${filters.description}%`,
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

      const categorias = await models.Categories.findAll(queryOptions);

      let recordsFound = true;

      if (categorias.length===0){
        recordsFound = false;
      }

      const totalItems = await models.Categories.count(queryOptions);

      const totalPages = Math.ceil(totalItems / pageSize);

      const response = {
        data: categorias,
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
    const categori = await models.Categories.findByPk(id);
    if (!categori) {
      throw boom.notFound('categorie not found');
    }
    return categori;
  }


  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    try {
      const categori = await this.findOne(id);

      await categori.update({ deleted: true, deleted_at: new Date() });
      if (categori.deleted) {
        return {
          message: 'categori was previously removed.',
        };
      }
      return { id, message: 'categori deleted successfully'};
    } catch (error) {
      throw boom.badRequest('Error deleting categori', error);
    }
  }

}

module.exports = CategoriesService;
