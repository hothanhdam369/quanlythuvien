const TheoDoiMuonSach = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TheoDoiMuonSachService = require("../services/theodoimuonsach.service");

exports.create = async (req, res, next) => {
    if ((!req.body?.maDocGia) || (!req.body?.maSach) || (!req.body?.ngayMuon)) {
        return next(new ApiError(400, "Theo Doi Muon Sach's \"ma sach, ma doc gia, ngay muon\" can not be empty"));
    }
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log("Error creating Theo doi muon sach:", error);
        return next(
            new ApiError(500, "An error occurred while creating the Theo doi muon sach")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await theoDoiMuonSachService.findByName(name);
        } else {
            documents = await theoDoiMuonSachService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving danh sach theo doi muon sach")
        );
    }
    return res.send(documents)
};
exports.findOne = async (req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Theo doi muon sach not found"));

        }
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving theo doi muon sach with id=${req.params.id}`
            )
        );

    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Theo doi muon sach not found"));
        }
        return res.send({
            message: "Theo doi muon sach was updated successfully"
        });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Theo doi muon sach with id = ${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Theo Doi muon sach not found"));
        }
        return res.send({ message: "Theo doi muon sach was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Theo doi muon sach with id=${req.params.id}`
            )
        );
    }
}
exports.deleteAll = async (_req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const deletedCount = await theoDoiMuonSachService.deleteAll();
        return res.send({
            message: `${deletedCount} danh sach theo doi muon sach were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all danh sach theo doi muon sach")
        );
    }
};