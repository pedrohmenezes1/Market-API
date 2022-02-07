const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const carsValidation = require('../../validations/cars.validation');
const carsController = require('../../controllers/cars.controller');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(carsValidation.createCars), carsController.createCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCars);

router
  .route('/:carsId')
  .delete(auth, validate(carsValidation.deleteCars), carsController.deleteCars)
  .patch(auth, validate(carsValidation.updateCars), carsController.updateCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCarsId);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: CRUD de carros
 */

/**
 * @swagger
 * /car:
 *   post:
 *      summary: Cadastrar carros
 *      description: Só pode cadastrar carros se estiver logado.
 *      tags: [Cars]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - modelo
 *                - cor
 *                - ano
 *                - acessorios
 *                - quantidadedePassageiros
 *              properties:
 *                modelo:
 *                  type: string
 *                cor:
 *                  type: string
 *                ano:
 *                  type: string
 *                acessorios:
 *                  type: array
 *                  description: tem que ter no mínimo 1
 *                quantidadedePassageiros:
 *                  type: string
 *              example:
 *                modelo: GM S10 2.8
 *                cor: Branco
 *                ano: 2019
 *                acessorios: [
 *                      descrição: Ar-condicionado,
 *                      descrição: 4 Portas]
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Car'
 *        "400":
 *          $ref: '#/components/responses/ValidationError'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "500":
 *          $ref: '#/components/responses/RequestError'
 */
