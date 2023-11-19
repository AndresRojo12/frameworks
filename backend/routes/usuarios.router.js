const express = require('express');
const UsuariosService = require('./../services/usuarios.service');
const validatorHandler = require('./../middlewares/validator.handler');
//const capitalizeCase = require('../utils/transform/text');

const {
  createUsuariosSchema,
  updateUsuariosSchema,
  getUsuariosSchema,
} = require('./../schemas/usuarios.schema');

const router = express.Router();
const userService = new UsuariosService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUsuariosSchema,  'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUsuariosSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // const bodyLower = capitalizeCase(body.name);
      // body.name = bodyLower;
      if(!body.name){
        return res.status(400).json({ error: 'The name field is required' })
      }
      const newUser = await userService.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUsuariosSchema, 'params'),
  validatorHandler(updateUsuariosSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const updatedUser = await userService.update(id, changes);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUsuariosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
