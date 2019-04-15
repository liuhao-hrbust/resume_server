const mongoose = require('mongoose');
const user_mongoose = mongoose.createConnection('mongodb://localhost:27017/user', { useNewUrlParser: true });

user_mongoose.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');
    }
});

module.exports = user_mongoose;