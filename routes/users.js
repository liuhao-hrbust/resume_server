var express = require("express");
var router = express.Router();
const userCtrl = require('../controllers/userControllers');
const modelCtrl = require('../controllers/model_list');
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

router.post("/login.do", function(req, res) {
    console.log("接收到请求");
    let username = req.body;
    let response = {
        code: 0,
        username
    };
    res.send(response);
});

router.post("/model_list.do", modelCtrl.model_list);
router.post("/register.do", userCtrl.user_regist);
module.exports = router;
