const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsuariosService {

  constructor() {}

  async create(data) {
    try {
    //data.created_by = 1;
    await models.Usuarios.create(data);
    const successMessage = 'Usuario created successfully';
      return { message: successMessage };
    } catch (error) {
      throw boom.badRequest('Error creating pet race really exist', error);
    }
  }

  async find() {
    const response = await models.Usuarios.findAll({
    });
    return response;
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
