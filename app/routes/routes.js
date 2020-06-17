module.exports = app => {

    const controller = require("../controllers/crud.controller.js");
    
    app.post("/upload", controller.upload);
    
    app.get("/process", controller.process);

};
