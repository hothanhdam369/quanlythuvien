const express = require("express");
const theodoimuonsachController = require("../controllers/theodoimuonsach.controller");
const router = express.Router();
router.route("/")
    .get(theodoimuonsachController.findAll)
    .post(theodoimuonsachController.create)
    .delete(theodoimuonsachController.deleteAll);

router.route("/:id")
    .get(theodoimuonsachController.findOne)
    .put(theodoimuonsachController.update)
    .delete(theodoimuonsachController.delete);
module.exports = router;