const express = require('express');
const bodyParser =  require('body-parser');
const initWebRoutes =  require("./routes/api");
const connectDB =  require('./config/connectDB');
const cookie =  require('cookie-parser');

require('dotenv').config();

let app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cookie());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);
connectDB(app);

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is runing at port: " + port);
})
