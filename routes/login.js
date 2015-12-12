/**
 * Created by AstaTus on 2015/12/4.
 */
var express = require('express');
var userService = require('../service/UserService')
var log = require('../utils/Log')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {

    var params = req.body;

    userService.login(params.email, params.password).then(checkResult).error(checkErr);

    function checkResult(valid){
        if (valid){
           console.log('login success');
        }else{
            res.write('<script language="javascript">alert("保存成功！");</script>');
            console.log('login failed');
        }
    }

    function checkErr(e){
        log.getCurrent().fatal('userService.login:' + err);
    }

});

module.exports = router;
