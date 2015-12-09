/**
 * Created by AstaTus on 2015/12/7.
 */

var ModelFactory = require('./ModelFactory')

var UserModel = function(){
    this.name = "User";  //table name
    this.type = "mysql";
}

UserModel.insertUser = function(account, password, callback){
    var sql = 'INSERT INTO ? (account, password) VALUES (??);';
    var options = [this.name, [name, password]];

    SqlManager.excuteSqlAsync(sql, options).then(callback);
}

UserModel.findUser = function(account){
    var sql = 'SELECT * FROM ? WHERE account = ?;';
    var options = [this.name, account];

    SqlManager.excuteSqlAsync(sql, options).then(function(err, data){

        return UserEntity;
    });
}

exports =  UserModel;

