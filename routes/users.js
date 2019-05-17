var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/userControllers");
const modelCtrl = require("../controllers/model_list");
const loginCtrl = require("../controllers/user_login");
const multer = require("multer");
const resumeCtrl = require("../controllers/resumeControllers");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
var upload = multer({ storage });

router.post("/login.do", loginCtrl.user_login);

router.post("/model_list.do", modelCtrl.model_list);
router.post("/register.do", userCtrl.user_regist);
router.post("/saveResume.do", resumeCtrl.saveResume);
router.post("/getResumeList.do", resumeCtrl.getResumeList);
router.post("/getTargetResume.do", resumeCtrl.getTargetResume);
router.post("/uploadHead.do", upload.single("file"), function(req, res) {
    // 读取上传的图片信息
    var files = req.files;
    // 设置返回结果
    var result = {};
    if (!files[0]) {
        result.code = 1;
        result.errMsg = "上传失败";
    } else {
        result.code = 0;
        result.data = {
            url: files[0].path
        };
        result.errMsg = "上传成功";
    }
    res.end(JSON.stringify(result));
});
module.exports = router;
