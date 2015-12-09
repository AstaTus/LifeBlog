/**
 * Created by AstaTus on 2015/12/7.
 */

var userModel = require('../model/UserModel')
var Promise = require('bluebird')
var UserService = function(){

}

UserService.createAccount = function(account, password){

    userModel.insertUser(account, password, function(err){
        if (err){

        }
        callback()
    })

}

UserService.login = function(account, password){

    return Promise.resolve(account).bind(password).then(function(account){
        return [userModel.findUser(account), password];
    }).spread(function(user, password){
        if (user.password === password)
            return true;
        else
            return false;
    }).bind();
}

UserService.verifyAccount(account)

exports = UserService;