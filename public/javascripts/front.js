/**
 * Created by AstaTus on 2015/12/13.
 */


/*之后一个页面对应一个js 里面包括param 和 dto*/
function Sender(){
}

Sender.post = function(url, param, callback){
    $.post(url, param, callback);

}

Sender.get = function(url, callback){
    $.get(url, callback);
}