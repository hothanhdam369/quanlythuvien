const express = require("express");
const docgiaController = require("../controllers/docgia.controller");
const router = express.Router();
router.route("/")
    .get(docgiaController.findAll)
    .post(docgiaController.create)
    .delete(docgiaController.deleteAll);

router.route("/:id")
    .get(docgiaController.findOne)
    .put(docgiaController.update)
    .delete(docgiaController.delete);
module.exports = router;