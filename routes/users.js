var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/userControllers");
const modelCtrl = require("../controllers/model_list");
const loginCtrl = require("../controllers/user_login");
const resumeCtrl = require("../controllers/resumeControllers");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

router.post("/login.do", loginCtrl.user_login);

router.post("/model_list.do", modelCtrl.model_list);
router.post("/register.do", userCtrl.user_regist);
router.post("/saveResume.do", resumeCtrl.saveResume);
router.post('/getResumeList.do', resumeCtrl.getResumeList);
module.exports = router;
