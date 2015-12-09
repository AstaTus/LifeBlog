/**
 * Created by AstaTus on 2015/12/4.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    //dto
    service.login(name, password).then(function(dto){
        res.render('login', { title: 'Express' });
    });
});

router.post('/', function(req, res, next) {



});

module.exports = router;
