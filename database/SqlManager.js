/**
 * Created by AstaTus on 2015/12/6.
 */

var mysql = require('mysql')
var config = require('../config/DatabaseConfig')
var promise = require('bluebird')

promise.promisifyAll(mysql);
promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);


var SqlManager = function(){
    this.mPool = null;
}

SqlManager.prototype.init = function(){
    this.mPool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
}

SqlManager.prototype.excuteSqlAsync = function(sql, options){

    function query(conn){
        return conn.queryAsync(sql, options).then(function(){
            conn.release();
        });
    }

   return this.mPool.getConnectionAsync().then(query);
}
