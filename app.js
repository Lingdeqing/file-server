const fs = require('fs-extra');
const path = require('path');
const express = require("express");
const multer = require("multer");
const app = express();
const port = 23000;

const dest = 'files/images';
fs.ensureDir(dest);

const upload = multer({ dest });
app.use("/images", express.static("files/images"));
app.use("/test", express.static("test"));

function cors() {
  return function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Origin", "*"
    );
    next();
  }
}

app.post("/api/media/pic/upload", cors(), upload.single("file"), function (req, res, next) {
  if (!req.file) {
    res.status(200);
    res.json({
      code: 1,
      msg: '没有读取到上传到文件'
    })
    return;
  }
  const filepath = req.file.path + path.extname(req.file.originalname);
  fs.rename(req.file.path, filepath, function (error) {
    if (error) {
      res.status(200);
      res.json({
        code: 1,
        msg: error + ''
      })
    } else {
      res.status(200);
      res.json({
        code: 0,
        msg: 'ok',
        data: `http://localhost:3000/images/${path.basename(filepath)}`
      })
    }
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 