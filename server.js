const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "API is up and running."});
});

require("./app/routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
