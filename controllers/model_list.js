const ListModel = require("../model/resume/models");

const model_list = async function(req, res) {
    const responseData = {
        code: 0,
        data: {},
        msg: "",
        error: "",
        status: 200
    };
    try {
        const list = await getListAsync();
        // console.log(list);
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
const getListAsync = async function() {
    return new Promise(function(resolve, reject) {
        ListModel.find({}, function(error, data) {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        });
    });
};

module.exports = {
    model_list
};
