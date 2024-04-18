const NXBService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.maNXB) {
        return next(new ApiError(400, "NXB's \"maNXB\" can not be empty"));
    }
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log("Error creating NXB:", error);
        return next(
            new ApiError(500, "An error occurred while creating the NXB")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nxbService = new NXBService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nxbService.findByName(name);
        } else {
            documents = await nxbService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving List NXB")
        );
    }
    return res.send(documents)
};
exports.findOne = async (req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "NXB not found"));

        }
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving NXB with id=${req.params.id}`
            )
        );

    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "NXB not found"));
        }
        return res.send({
            message: "NXB was updated successfully"
        });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating NXB with id = ${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "NXB not found"));
        }
        return res.send({ message: "NXB was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete NXB with id=${req.params.id}`
            )
        );
    }
}
exports.deleteAll = async (_req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const deletedCount = await nxbService.deleteAll();
        return res.send({
            message: `${deletedCount} NXB were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all NXB")
        );
    }
};