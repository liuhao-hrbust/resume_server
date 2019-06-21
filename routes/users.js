var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/userControllers");
const modelCtrl = require("../controllers/model_list");
const path = require("path");
const fs = require("fs");
const loginCtrl = require("../controllers/user_login");
const multer = require("multer");
const resumeCtrl = require("../controllers/resumeControllers");
const resumeHeadCtrl = require("../controllers/resumeHeadController");
var storage = multer.diskStorage({
    destination: path.join(process.cwd(), "public/images", "uploads"),
    filename: function(req, file, cb) {
        const fileFormat = (file.originalname).split(".");
        cb(null, `${req.session.userName}^${req.session.resumeId}^${Date.now()}.${fileFormat[fileFormat.length - 1]}`);
    }
});
var upload = multer({ storage });

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
router.post("/login.do", loginCtrl.user_login);

router.post("/model_list.do", modelCtrl.model_list);
router.post("/register.do", userCtrl.user_regist);
router.post("/changeAccount.do", userCtrl.change_account);
router.post("/saveResume.do", resumeCtrl.saveResume);
router.post("/getResumeList.do", resumeCtrl.getResumeList);
router.post("/getTargetResume.do", resumeCtrl.getTargetResume);
router.post(
    "/uploadHead.do",
    upload.single("imageFile"),
    resumeCtrl.uploadHead
);
router.post("/createNewResumeId.do", resumeCtrl.createNewResumeId);
module.exports = router;
