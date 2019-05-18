const ResumeHeadModel = require("../model/member_resume/resume_head");

function uploadHead(req, res) {
    console.log(req.session.resumeId);
    // 读取上传的图片信息
    var file = req.file;
    // 设置返回结果
    var result = {};
    if (!file) {
        result.code = 1;
        result.errMsg = "上传失败";
    } else {
        result.code = 0;
        result.data = {
            url: file.path
        };
        result.errMsg = "上传成功";
    }
    res.send(result);
}

module.exports = {
    uploadHead
};
