const NhanVienSerVice = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.MSNV) {
        return next(new ApiError(400, "Nhan Vien's \"MSNV\" can not be empty"));
    }
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const document = await nhanVienService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log("Error creating Nhan Vien:", error);
        return next(
            new ApiError(500, "An error occurred while creating the Nhan Vien")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nhanVienService.findByName(name);
        } else {
            documents = await nhanVienService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Nhan Vien")
        );
    }
    return res.send(documents)
};
exports.findOne = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const document = await nhanVienService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Nhan Vien not found"));

        }
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving Nhan Vien with id=${req.params.id}`
            )
        );

    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const document = await nhanVienService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Nhan Vien not found"));
        }
        return res.send({
            message: "Nhan Vien was updated successfully"
        });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Nhan Vien with id = ${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const document = await nhanVienService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Nhan Vien not found"));
        }
        return res.send({ message: "Nhan Vien was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Nhan Vien with id=${req.params.id}`
            )
        );
    }
}
exports.deleteAll = async (_req, res, next) => {
    try {
        const nhanVienService = new NhanVienSerVice(MongoDB.client);
        const deletedCount = await nhanVienService.deleteAll();
        return res.send({
            message: `${deletedCount} danh sach nhan vien were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all nhan vien")
        );
    }
};