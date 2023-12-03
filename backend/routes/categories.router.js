const express = require('express');
const CategoriesService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');
//const capitalizeCase = require('../utils/transform/text');

const {
  createCategoriesSchema,
  updateCategoriesSchema,
  getCategoriesSchema,
} = require('./../schemas/categories.schema');

const router = express.Router();
const categorieService = new CategoriesService();

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10;
    let filters = {};
    if (req.query.name) {
      filters = { name: req.query.name };
    }
    if (req.query.description) {
      filters = { description: req.query.description };
    }
    if (req.query.created_at) {
      filters={created_at: req.query.created_at}
    }
    const categories = await categorieService.find(page,perPage,filters);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categori = await categorieService.findOne(id);
      res.json(categori);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // const bodyLower = capitalizeCase(body.name);
      // body.name = bodyLower;
      await categorieService.create(body);
      res.status(201).json("Categorie created has been successfully")
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const updatedCategorie = await categorieService.update(id, changes);
      res.json(updatedCategorie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await categorieService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
