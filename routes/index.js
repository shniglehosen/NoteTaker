const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/api/notes", require("./noteRouters"));

router.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

router.get("*", function(req, rest) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;