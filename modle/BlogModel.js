/**
 * Created by AstaTus on 2015/12/6.
 */

var BlogModel = function(){
    this.name = "User";  //table name
    this.type = "mysql";
}


BlogModel.insertAcount = function(name , password){
    var sql = 'INSERT INTO ? (name, password) VALUES (??);';
    var options = [this.name, [name, password]];

    return SqlManager.excuteSqlAsync(sql, options).then(callback);
}

BlogModel.selectAcount = function(name){
}

exports =  BlogModel;

