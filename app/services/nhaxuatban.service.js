const { ObjectId } = require("mongodb");

class NXBService {
    constructor(client) {
        this.NXB = client.db().collection("NXB");
    }

    extractNXBData(payload) {
        const nxb = {
            maNXB: payload.maNXB,
            tenNXB: payload.tenNXB,
            diaChi: payload.diaChi,
        };
        // Remove undefined fields
        Object.keys(nxb).forEach(
            (key) => nxb[key] === undefined && delete nxb[key]
        );
        return nxb;
    }
    async create(payload) {
        const nxb = this.extractNXBData(payload);
        const { maNXB } = payload;
        const result = await this.NXB.findOneAndUpdate(
            { maNXB },
            { $set: nxb },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(filter) {
        const cursor = await this.NXB.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.NXB.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNXBData(payload);
        const options = { returnDocument: "after" };
        const result = await this.NXB.findOneAndUpdate(
            filter,
            { $set: update },
            options
        );
        return result;
    }
    async delete(id) {
        const result = await this.NXB.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.NXB.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = NXBService;
