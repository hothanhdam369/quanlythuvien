const express = require("express");
const nxbController = require("../controllers/nhaxuatban.controller");
const router = express.Router();
router.route("/")
    .get(nxbController.findAll)
    .post(nxbController.create)
    .delete(nxbController.deleteAll);

router.route("/:id")
    .get(nxbController.findOne)
    .put(nxbController.update)
    .delete(nxbController.delete);
module.exports = router;