const express = require('express');
const router = express.Router();
const controllerOrder = require('../controller/order')


router.get("/", controllerOrder.get);
router.get("/:id", controllerOrder.getByUserId);
router.post("/", controllerOrder.post);

module.exports = router;