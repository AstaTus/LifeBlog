/**
 * Created by AstaTus on 2015/12/7.
 */

SqlManager = require('../database/SqlManager')

function insertRecord(model, entity, callback){

}

function removeRecord(model, obj, criteria, callback){
    var sql = 'update ?? set ? where ';
    var options = [model.name, obj], link = '';
    for (var key in criteria) {
        options.push(key);
        options.push(criteria[key]);
        sql += link + '?? = ?';
        link = ' and ';
    }
    sql += ';';
}

function updateRecord(model, obj, criteria, callback){
    var sql = 'update ?? set ? where ';
    var options = [model.name, obj], link = '';
    for (var key in criteria) {
        options.push(key);
        options.push(criteria[key]);
        sql += link + '?? = ?';
        link = ' and ';
    }
    sql += ';';

}

function selectRecord(model, entity, criteria, callback){
    var sql = 'SELECT ';
    var options = [];
    for (var key in entity) {
        options.push(key);
        sql += '??,';
    }
    sql[sql.length - 1] =' ';
    sql += 'FROM ??';

    options.push(model.name);

    if(criteria.length > 0){
        sql += ' WHERE ';
        link = '';
        for(var key in criteria){
            options.push(key);
            options.push(criteria[key]);

            sql += link + '?? = ?';
            link = 'and';
        }
    }

    SqlManager.excuteSqlAsync(sql, options).then(callback);
}

function decorateModel(model) {

    if ('mysql' === model.type) {
        model.insert = function(entity, callback){
            insertRecord(model, entity, callback);
        };

        model.remove = function(criteria, callback){
            removeRecord(model, criteria, callback);
        };

        model.update = function(obj, criteria, callback){
            updateRecord(model, obj, criteria, callback);
        };

        model.select = function(criteria, range, callback){
            selectRecord(model, criteria, range, callback);
        };
    }
    return model;
}

exports = decorateModel;
