const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route");
const nxbRouter = require("./app/routes/nhaxuatban.route");
const docGiaRouter = require("./app/routes/docgia.route");
const nhanVienRouter = require("./app/routes/nhanvien.route");
const theoDoiMuonSachRouter = require("./app/routes/theodoimuonsach.route");



const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to QUAN LY THU VIEN application" });
});
app.use("/api/books", booksRouter)
app.use("/api/nxb", nxbRouter)
app.use("/api/docgia", docGiaRouter)
app.use("/api/nhanvien", nhanVienRouter)
app.use("/api/theodoimuonsach", theoDoiMuonSachRouter)


// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message
    });
});

module.exports = app;