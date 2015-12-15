/**
 * Created by AstaTus on 2015/12/4.
 */
var express = require('express');
var userService = require('../service/UserService')
var log = require('../utils/Log')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { error: '' });
});

router.post('/', function(req, res, next) {
    var params = req.body;
    userService.login(params.email, params.password).then(checkResult).error(checkErr);

    function checkResult(valid){
        if (valid){
            req.flash('success', '登入成功');
            req.session.user = {id:'111', value:'222'};
            res.redirect('/');
        }else{
            res.render('login',{ error: '用户名或者密码不存在' });
        }
    }

    function checkErr(e){
        log.getCurrent().fatal('userService.login:' + err);
    }

});

module.exports = router;
