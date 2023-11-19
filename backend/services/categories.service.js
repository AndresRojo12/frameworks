const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoriesService {

  constructor() {}

  async create(data) {
    try {
    //data.created_by = 1;
    await models.Categories.create(data);
    const successMessage = 'Category created successfully';
      return { message: successMessage };
    } catch (error) {
      throw boom.badRequest('Error creating category really exist', error);
    }
  }

  async find() {
    const response = await models.Categories.findAll({
    });
    return response;
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
    const categor = await this.findOne(id);
    await categor.update({ deleted: true, deleted_at: new Date() });
    return { id };
  }

}

module.exports = CategoriesService;
