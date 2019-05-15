const UserModel = require("../model/user");
const md5 = require("md5");

const user_login = async function(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    const User = req.body;
    const { user_name, user_password } = User;

    // 验证用户是否存在
    try {
        const user = await findUserAsyc({
            user_name,
            user_password: md5(md5(user_password) + "meirenjie")
        });

        if (!user) {
            responseData.status = "00002";
            responseData.error = "用户名或密码输入错误";
            return res.json(responseData);
        } else {
            req.session.isLogin = true;
            req.session.userName = user_name;
            responseData.msg = "登录成功！";
            responseData.code = 0;
            return res.json(responseData);
        }
    } catch (error) {
        console.log(error);
        responseData.error = error;
        return res.json(responseData);
    }
};

/**
 * params:  {cnd}:user find condition
 * return:  user
 * describe: findUserAsyc
 **/
const findUserAsyc = async function(cnd) {
    return new Promise(function(resolve, reject) {
        UserModel.findOne(cnd, function(error, data) {
            if (error) {
                console.log(error);
                return reject(error);
            }
            return resolve(data);
        });
    });
};

module.exports = {
    user_login
};
