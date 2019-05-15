const ResumeModel = require("../model/member_resume/member_resume");

const saveResume = async function(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        // if (!req.session.isLogin) {
        //     responseData.error = "用户没有登录";
        //     responseData.status = 500;
        //     return res.json(responseData);
        // }
        // const { userName } = req.session;
        const { resumeId } = req.body;
        const userName = "asd";
        const resume = await getResume({ userInfo: userName });
        console.log(resume.length);
        const targetResume = await getResume({ userInfo: userName, resumeId });
        const params = req.body;
        params.userInfo = userName;
        if (!targetResume.length) {
            // 是新建的简历
            params.resumeId = resume.length + 1;
            const newResume = new ResumeModel(params);
            await newResume.save(function(err, data) {
                if (err) {
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
                { userInfo: userName, resumeId },
                params,
                (err, data) => {
                    if (err) {
                        responseData.status = "00001";
                        responseData.error = "mongodb system error";
                        console.log("err");
                        return res.json(responseData);
                    } else {
                        responseData.msg = "简历保存成功";
                        return res.json(responseData);
                    }
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
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        // console.log(req.session);
        // if (!req.session.isLogin) {
        //     responseData.error = "用户没有登录";
        //     return res.json(responseData);
        // }
        // console.log(req.cookies)
        const userName = 'asd';
        const list = await getResume({userInfo: userName});
        responseData.data.list = list;
        return res.json(responseData);
    } catch (error) {
        responseData.status = 500;
        responseData.error = error;
        return res.json(responseData);
    }
};
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

// const saveResume = async function() {

// }

module.exports = {
    saveResume,
    getResumeList
};