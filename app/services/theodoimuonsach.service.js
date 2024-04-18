const { ObjectId } = require("mongodb");

class TheoDoiMuonSachService {
    constructor(client) {
        this.TheoDoiMuonSach = client.db().collection("theodoimuonsach");
    }

    extractTheoDoiMuonSachData(payload) {
        const theoDoiMuonSach = {
            maDocGia: payload.maDocGia,
            maSach: payload.maSach,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
        
        };
        // Remove undefined fields
        Object.keys(theoDoiMuonSach).forEach(
            (key) => theoDoiMuonSach[key] === undefined && delete theoDoiMuonSach[key]
        );
        return theoDoiMuonSach;
    }
    async create(payload) {
        const theoDoiMuonSach = this.extractTheoDoiMuonSachData(payload);
        const { maDocGia, maSach, ngayMuon } = payload;
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            { maDocGia, maSach, ngayMuon },
            { $set: theoDoiMuonSach },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(filter) {
        const cursor = await this.TheoDoiMuonSach.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.TheoDoiMuonSach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTheoDoiMuonSachData(payload);
        const options = { returnDocument: "after" };
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            filter,
            { $set: update },
            options
        );
        return result;
    }
    async delete(id) {
        const result = await this.TheoDoiMuonSach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.TheoDoiMuonSach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = TheoDoiMuonSachService;
