const express = require("express");
var cors = require('cors')
const app = express();
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env')
});
const port = 8000;
const userRoute = require("./routes/users");
const prodRoute = require("./routes/productRoutes");
const bannerRoute = require("./routes/bannerRoute");
const pagesRoute = require("./routes/pagesRoute");
const contactRoute = require("./routes/contactRoute");
const mediaRoute = require("./routes/mediaRoute");
const seoRoute = require("./routes/seoRoute");

var bodyParser = require('body-parser');
const passport = require('passport');

app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb',extended: true }));

app.use("/user", userRoute);

app.use("/product", prodRoute);

app.use("/banner", bannerRoute);
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use("/pages", pagesRoute);

app.use("/contact", contactRoute);
app.use("/media", mediaRoute);
app.use("/seo", seoRoute);

app.listen(port, () => {
    console.log(`App is listening at http://${process.env.HOST}:${process.env.PORT}`)
});