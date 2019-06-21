const UserModel = require("../model/user");
const md5 = require("md5");

const user_regist = async function(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    const { user_name, user_password } = req.body;
    const User = req.body;

    // 验证用户是否已经注册
    try {
        const user = await findUserAsyc({ 'user_name': user_name });
        if (user) {
            responseData.status = 10002;
            responseData.error = "用户名已存在";
            return res.json(responseData);
        }

        // 新建用户
        User.user_password = md5(md5(user_password) + 'meirenjie');
        const newUser = new UserModel(User);

        await newUser.save(function(err, data) {
            if (err) {
                responseData.status = "00001";
                responseData.error = "mongodb system error";
                console.log(err);
                return res.json(responseData);
            }
            responseData.msg = "新用户注册成功";
            return res.json(responseData);
        });
    } catch (error) {
        console.log(error);
        responseData.error = 'e';
        return res.json(responseData);
    }
};

const change_account = async function(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    const { user_name, user_password, nuser_password } = req.body;
    const params = {user_name, user_password: md5(md5(nuser_password) + "meirenjie")};

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
            UserModel.update({
                user_name
            },
            params,
            (err, data) => {
                if (err) {
                    responseData.status = "00001";
                    responseData.error = "mongodb system error";
                    console.log("err");
                    return res.json(responseData);
                }
                responseData.status = "00008";
                responseData.msg = "密码修改成功";
                return res.json(responseData);
            })
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
    // console.log(
    //     "controllers/UserController.js/findUserAsyc start --> " +
    //         JSON.stringify(cnd)
    // );
    return new Promise(function(resolve, reject) {
        UserModel.findOne(cnd, function(error, data) {
            // console.log(
            //     "controllers/UserController.js/findUserAsyc findOne  data --> " +
            //         JSON.stringify(data)
            // );
            if (error) {
                console.log(error);
                return reject(error);
            }
            return resolve(data);
        });
    });
};

module.exports = {
    user_regist,
    change_account
};
