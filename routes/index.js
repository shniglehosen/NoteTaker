const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/api/notes", require("./noteRouters"));
console.log("world1");

router.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;