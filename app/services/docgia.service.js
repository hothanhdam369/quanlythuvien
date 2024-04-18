const { ObjectId } = require("mongodb");

class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection("docgia");
    }

    extractDocGiaData(payload) {
        const docGia = {
            maDocGia: payload.maDocGia,
            hoLot: payload.hoLot,
            ten: payload.ten,
            soQuyen: payload.soQuyen,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai:payload.dienThoai
        };
        // Remove undefined fields
        Object.keys(docGia).forEach(
            (key) => docGia[key] === undefined && delete docGia[key]
        );
        return docGia;
    }
    async create(payload) {
        const docGia = this.extractDocGiaData(payload);
        const { maDocGia } = payload;
        const result = await this.DocGia.findOneAndUpdate(
            { maDocGia },
            { $set: docGia },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.DocGia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractDocGiaData(payload);
        const options = { returnDocument: "after" };
        const result = await this.DocGia.findOneAndUpdate(
            filter,
            { $set: update },
            options
        );
        return result;
    }
    async delete(id) {
        const result = await this.DocGia.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocGiaService;
