const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(120);
const description = Joi.string().max(250);

const createCategoriesSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCategoriesSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const getCategoriesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategoriesSchema,
  updateCategoriesSchema,
  getCategoriesSchema,
};
