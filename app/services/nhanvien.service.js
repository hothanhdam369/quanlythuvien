const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection("nhanvien");
    }

    extractNhanVienData(payload) {
        const nhanVien = {
            MSNV: payload.MSNV,
            hoTenNhanVien: payload.hoTenNhanVien,
            password: payload.password,
            chucVu: payload.chucVu,
            diaChi: payload.diaChi,
            maNhaXuatBan: payload.maNhaXuatBan,
            soDienThoai: payload.soDienThoai,
        };
        // Remove undefined fields
        Object.keys(nhanVien).forEach(
            (key) => nhanVien[key] === undefined && delete nhanVien[key]
        );
        return nhanVien;
    }
    async create(payload) {
        const nhanVien = this.extractNhanVienData(payload);
        const { MSNV } = payload;
        const result = await this.NhanVien.findOneAndUpdate(
            { MSNV },
            { $set: nhanVien },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanVienData(payload);
        const options = { returnDocument: "after" };
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update },
            options
        );
        return result;
    }
    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService;
