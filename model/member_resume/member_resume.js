const mongoose = require("mongoose");
const user_mongoose = require("../../config/db_mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    userInfo: {
        type: String,
        required: true
    },
    resumeId: {
        type: Number,
        default: 0
    }, 
    user_name: {
        type: String,
        default: ""
    },
    resumeName: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        default: ""
    },
    user_desc: {
        type: String,
        default: ""
    },
    educationInfo: {
        type: String,
        default: ``
    },
    experience: {
        type: String,
        default: ""
    },
    target: {
        type: String,
        default: ``
    },
    age: {
        type: String,
        default: ""
    },
    addr: {
        type: String,
        default: ""
    },
    seniority: {
        type: String,
        default: ""
    },
    tel: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    extra: {
        type: String,
        default: ""
    },
    self_val:  {
        type: String,
        default: ""
    },
    created_time: {
        type: Date,
        // 注意：这里不要写 Date.now() 因为会即刻调用
        // 这里直接给了一个方法：Date.now
        // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
        default: Date.now
    }
});

module.exports = user_mongoose.model("userResumes", resumeSchema);
