/**
 * 模板列表
 */

const mongoose = require("mongoose");
const user_mongoose = require("../../config/db_mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    model_name: {
        type: String,
        required: true
    },
    thumbnail_src: {
        type: String,
        required: true
    }
});

module.exports = user_mongoose.model("Model", modelSchema);
