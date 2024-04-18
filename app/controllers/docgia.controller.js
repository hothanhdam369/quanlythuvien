const DocGiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.maDocGia) {
        return next(new ApiError(400, "DOC GIA's \"maDocGia\" can not be empty"));
    }
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const document = await docGiaSerVice.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log("Error creating Doc Gia:", error);
        return next(
            new ApiError(500, "An error occurred while creating the Doc Gia")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await docGiaSerVice.findByName(name);
        } else {
            documents = await docGiaSerVice.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Doc Gia")
        );
    }
    return res.send(documents)
};
exports.findOne = async (req, res, next) => {
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const document = await docGiaSerVice.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Doc Gia not found"));

        }
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving Doc Gia with id=${req.params.id}`
            )
        );

    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const document = await docGiaSerVice.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Doc Gia not found"));
        }
        return res.send({
            message: "Doc GIa was updated successfully"
        });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Doc Gia with id = ${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const document = await docGiaSerVice.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Doc Gia not found"));
        }
        return res.send({ message: "Doc Gia was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Doc Gia with id=${req.params.id}`
            )
        );
    }
}
exports.deleteAll = async (_req, res, next) => {
    try {
        const docGiaSerVice = new DocGiaService(MongoDB.client);
        const deletedCount = await docGiaSerVice.deleteAll();
        return res.send({
            message: `${deletedCount} Doc Gia List were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all List Doc Gia")
        );
    }
};
