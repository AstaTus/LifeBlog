/**
 * Created by AstaTus on 2015/12/7.
 */

var userModel = require('../model/UserModel')
var promise = require('bluebird')
var log = require('../utils/Log')
UserService = function(){

}

UserService.createAccount = function(account, password){

    userModel.insertUser(account, password, function(err){
        if (err){

        }
        callback()
    })

}

UserService.login = function(account, password){

    return promise.all([getUser(account), getPassword(password)]).spread(checkUser);

    function getUser(account){
        return userModel.findUser(account);
    }

    function getPassword(password){
        return promise.resolve(password);
    }

    function checkUser(user, password){
        if(user == null){
            return false;
        }
        else if (user.password === password)
            return true;
        else
            return false;
    }
}

module.exports = UserService;