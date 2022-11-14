const express = require('express');
const app = express();
const path = require('path');
const router = require('./router');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const OriginList = ["https://polish-design.com.tw/"];
const corsOptions = {
    // "origin": OriginList,
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "allowedHeaders": ["Content-Type", "X-Requested-With", "*"],
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '/build')));
app.use('/', router.allrouter);

app.listen(port);

// app.use(function (req, res, next) { // no valid route was found
//     res.status(404);
//     res.render('partials/notFound', {});
// });

console.log('Express server listening on port ' + app.get('port'));