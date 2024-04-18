const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }

    extractBookData(payload) {
        const book = {
            maSach: payload.maSach,
            tenSach: payload.tenSach,
            donGia: payload.donGia,
            soQuyen: payload.soQuyen,
            namXuatBan: payload.namXuatBan,
            maNhaXuatBan: payload.maNhaXuatBan,
            tacGia: payload.tacGia,
        };
        // Remove undefined fields
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }
    async create(payload) {
        const book = this.extractBookData(payload);
        const { maSach } = payload;
        const result = await this.Book.findOneAndUpdate(
            { maSach },
            { $set: book },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    
    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookData(payload);
        const options = { returnDocument: "after" };
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            options
        );
        return result;
    }
    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;