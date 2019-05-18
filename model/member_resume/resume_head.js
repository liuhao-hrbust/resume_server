const mongoose = require("mongoose");
const user_mongoose = require("../../config/db_mongoose");
const Schema = mongoose.Schema;

const resumeHeadSchema = new Schema({
    resumeId: {
        type: Number,
        default: 0
    }, 
    img_src: {
        type: String,
        default: "http://127.0.0.1:3000/images/model01.png"
    }
});

module.exports = user_mongoose.model("resumeHead", resumeHeadSchema);
