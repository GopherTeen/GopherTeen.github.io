const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5500;

app.use(express.static("d:\\Code\\HomePage"));

app.get("/posts", (req, res) => {
    const postsDir = path.join(__dirname, "posts");
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            return res.status(500).send("无法读取 posts 文件夹");
        }
        const markdownFiles = files.filter((file) => file.endsWith(".md"));
        res.json(markdownFiles);
    });
});

app.listen(PORT, () => {
    console.log(`服务器已启动：http://localhost:${PORT}`);
});
