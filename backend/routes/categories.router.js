const express = require('express');
const CategoriesService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');
//const capitalizeCase = require('../utils/transform/text');

const {
  createCategorieSchema,
  updateCategorieSchema,
  getCategorieSchema,
} = require('./../schemas/categories.schema');

const router = express.Router();
const categorieService = new CategoriesService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await categorieService.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorieSchema, 'params'),
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
  validatorHandler(createCategorieSchema, 'body'),
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
  validatorHandler(getCategorieSchema, 'params'),
  validatorHandler(updateCategorieSchema, 'body'),
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
  validatorHandler(getCategorieSchema, 'params'),
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
