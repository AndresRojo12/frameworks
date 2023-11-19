const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(120);
const description = Joi.string().max(250);
const created_by = Joi.number().integer();

const createCategoriesSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  created_by: created_by.required(),
});

const updateCategoriesSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  created_by: created_by.required(),

});

const getCategoriesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategoriesSchema,
  updateCategoriesSchema,
  getCategoriesSchema,
};
