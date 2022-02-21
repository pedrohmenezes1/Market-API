const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/swagger.json');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerFile));

module.exports = router;
