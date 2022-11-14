const express = require("express");
const axios = require('axios');
const app = express();
const api_host = "https://api.polish-design.com.tw/api";

app.get("/", async (req, res) => {
    res.render("index", {
        title: "磨人設計 | Polish Design",
        description: "磨人設計 POLISH DESIGN 成立於2020年，作品橫跨品牌規劃、網頁設計、網站系統解決方案，我們喜歡有心意的設計、微互動、拉麵 🍜。",
        image: "https://cdn.polish-design.com.tw/images/gift/og_image.png",
        type: "website",
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });
});

app.use(function (req, res, next) {
    // no valid route was found
    // res.status(404);
    // res.render('index', {
    // 	title: "404 Not Found | Polish Design",
    //     description: "404 Not Found | Polish Design"
    // });
    res.redirect("/");
});

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/build', 'index.html'));
// });

exports.allrouter = app;
