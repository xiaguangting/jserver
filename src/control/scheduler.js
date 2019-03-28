var settings = require('../settings');
var iqiyi = require('./handlers/iqiyi');
var youku = require('./handlers/youku');

module.exports = {
    crack: function(req, res){
        var url = req.query.url;
        if(url === undefined){
            res.send(pack_resp_obj(400, "The Url parameter is required"))
        }
        var url_info = identify_url(url);
        var site = url_info[0];
        var id = url_info[1];
        if(site === undefined){
            res.send(pack_resp_obj(400, "Failed to identify url"))
        }else if(site === "iqiyi") {  // 爱奇艺站点
            iqiyi(id).then(value => {  // 成功回调
                res.send(pack_resp_obj(200, "succeed", {list: value}));
            }, value => {  // 失败回调
                res.send(pack_resp_obj(500, "Cracking failure"))
            });
        }else if(site === "youku") {  // 优酷站点
            youku(id).then(value => {  // 成功回调
                res.send(pack_resp_obj(200, "succeed", {list: value}));
            }, value => {  // 失败回调
                console.log(value);
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

function identify_url(url) {
    var site = undefined;
    var id = undefined;
    if(/iqiyi\.com/.test(url)){
        // https://www.iqiyi.com/v_19rsiezzrg.html
        site = "iqiyi";
        id = get_iqiyi_video_id(url)  // todo
    }else if(/youku\.com/.test(url)){
        // https://v.youku.com/v_show/id_XNDExMTI3NzgxMg==.html
        site = "youku";
        id = /\/id_(.*)\.h/.exec(url)[1]
    }
    return [site, id]
}
