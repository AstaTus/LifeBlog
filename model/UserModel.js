/**
 * Created by AstaTus on 2015/12/7.
 */

sqlManager = require('../database/SqlManager')
log = require('../utils/Log')
var UserModel = function(){}

UserModel.type = 'mysql';

UserModel.insertUser = function(account, password, callback){
    var sql = 'INSERT INTO ? (account, password) VALUES (??);';
    var options = [this.name, [name, password]];

    sqlManager.excuteSqlAsync(sql, options).then(callback);
}

UserModel.findUser = function(account){
    var sql = 'SELECT * FROM User WHERE account = ?';
    console.log(UserModel.tableName);
    var options = [account];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(rows){
        console.log('rows', rows);

        if(rows.length == 0){
            return null;
        }else if (rows.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.findUser: user record is rpeat");
            return null;
        }else{
            var user = new UserEntity();
            user.guid = rows[0].guid;
            user.account = rows[0].account;
            user.password = rows[0].password;
            return user;
        }
    }
}

module.exports =  UserModel;

