const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(120);
const apellido = Joi.string().max(250);

const createUsuariosSchema = Joi.object({
  name: name.required(),
  apellido: apellido.required(),
});

const updateUsuariosSchema = Joi.object({
  name: name.required(),
  apellido: apellido.required(),
});

const getUsuariosSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUsuariosSchema,
  updateUsuariosSchema,
  getUsuariosSchema,
};
