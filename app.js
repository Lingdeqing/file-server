const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });
app.use("/images", express.static("files/images"));

app.post("/profile", upload.single("avatar"), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
