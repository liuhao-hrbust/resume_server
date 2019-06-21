const ResumeModel = require("../model/member_resume/member_resume");
const path = require('path');

function loginCheck(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    if (!req.session.isLogin) {
        responseData.error = "用户没有登录";
        responseData.status = 400;
        return res.json(responseData);
    }
}
const saveResume = async function(req, res) {
    // loginCheck(req, res);
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        const { userName } = req.session;
        const { resumeId } = req.body;
        // const userName = session.user.userName;
        const resume = await getResume({ userInfo: userName });
        console.log(resume.length);
        const targetResume = await getResume({ userInfo: userName, resumeId });
        const params = req.body;
        params.userInfo = userName;
        if (!targetResume.length) {
            // 是新建的简历
            params.resumeId = resume.length + 1;
            if (req.session.headInfo) {
                console.log(req.session.headInfo.head_path);
                params.head_path = req.session.headInfo.path;
            }
            const newResume = new ResumeModel(params);
            await newResume.save(function(err, data) {
                if (err) {
                    console.log(err);
                    responseData.status = "00001";
                    responseData.error = "mongodb system error";
                    return res.json(responseData);
                }
                responseData.msg = "新简历保存成功";
                return res.json(responseData);
            });
        } else {
            // 修改
            ResumeModel.update(
                {
                    userInfo: userName,
                    resumeId
                },
                params,
                (err, data) => {
                    if (err) {
                        responseData.status = "00001";
                        responseData.error = "mongodb system error";
                        console.log("err");
                        return res.json(responseData);
                    }
                    responseData.msg = "简历保存成功";
                    return res.json(responseData);
                }
            );
        }
    } catch (error) {
        responseData.status = 500;
        responseData.error = "sadsad";
        return res.json(responseData);
    }
};

const getResumeList = async function(req, res) {
    // loginCheck(req, res);
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        // console.log(req.cookies)
        const { userName } = req.session;
        const list = await getResume({ userInfo: userName });
        responseData.data.list = list;
        return res.json(responseData);
    } catch (error) {
        responseData.status = 500;
        responseData.error = error;
        return res.json(responseData);
    }
};

const getTargetResume = async function(req, res) {
    // loginCheck(req, res);
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        const { userName } = req.session;
        const { resumeId } = req.body;
        req.session.resumeId = resumeId;
        // console.log(resumeId);
        // const userName = "asd";
        const targetResume = await getResume({ userInfo: userName, resumeId });
        if (targetResume.length === 0) {
            responseData.data.resume = null;
            return res.json(responseData);
        } else {
            responseData.data.resume = targetResume[0];
            return res.json(responseData);
        }
    } catch (error) {
        responseData.status = 500;
        responseData.error = "sadsad";
        return res.json(responseData);
    }
};

function uploadHead(req, res) {

    // 读取上传的图片信息
    var file = req.file;
    // 设置返回结果
    var result = {};
    if (!file) {
        result.code = 1;
        result.errMsg = "上传失败";
    } else {
        result.code = 0;
        const filePath = 'http://127.0.0.1:3000/images/uploads/' + file.path.split('\\')[file.path.split('\\').length - 1];
        result.data = {
            url: filePath
        };
        req.session.headInfo = {
            resumeId: req.session.resumeId,
            path: filePath
        };
        result.errMsg = "上传成功";
    }
    return res.send(result);
}
function createNewResumeId(req, res) {
    req.session.resumeId = req.body.resumeId;
    req.session.headInfo = null;
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    return res.send(responseData);
}

/**
 * return:  model_list
 * describe: getListAsync
 **/
const getResume = async function(cnd) {
    return new Promise(function(resolve, reject) {
        ResumeModel.find(cnd, function(error, data) {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        });
    });
};

// const saveResume = async function() { }

module.exports = {
    saveResume,
    getResumeList,
    getTargetResume,
    uploadHead,
    createNewResumeId
};
