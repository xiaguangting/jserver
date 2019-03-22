var iqiyi = require('./handlers/iqiyi');
var settings = require('../settings');

module.exports = {
    crack: function(req, res){
        var site = req.query.site;
        var id = req.query.id;
        if(site === undefined){
            res.send(pack_resp_obj(400, "The Site parameter is required"))
        }else if(site === settings.site.iqiyi.toString()){  // 爱奇艺站点
            iqiyi(id).then(value => {  // 成功回调
                res.send(pack_resp_obj(200, "succeed", {lists: value}));
            }, value => {  // 失败回调
                res.send(pack_resp_obj(500, "Cracking failure"))
            });
        }else{
            res.send(pack_resp_obj(400, "This site is not supported"))
        }
    },
};

function pack_resp_obj(code, msg, data={}) {  // 打包响应对象
    return {
        code: code,
        msg: msg,
        data: data
    }
}
