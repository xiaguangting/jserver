var settings = require('../settings');
var iqiyi = require('./handlers/iqiyi');
var youku = require('./handlers/youku');


module.exports = {
    crack: function(req, res){
        var url = req.query.url;
        if(url === undefined || url === ''){
            res.send(pack_resp_obj(400, "The Url parameter is required"))
        }else {
            var site = identify_url_site(url);
            var crack_method;
            if (site === undefined) {
                res.send(pack_resp_obj(400, "Failed to identify site"))
            } else if (site === "iqiyi") {  // 爱奇艺站点
                crack_method = iqiyi;
            } else if (site === "youku") {  // 优酷站点
                crack_method = youku;
            } else {
                res.send(pack_resp_obj(400, "This site is not supported"))
            }
            if (crack_method !== undefined) {
                crack_method(url).then(value => {  // 成功回调
                    res.send(pack_resp_obj(200, "succeed", value));
                }, value => {  // 失败回调
                    console.log(value);
                    var msg;
                    if(typeof(value) === "string"){
                        msg = value
                    }else{
                        msg = "Cracking failure"
                    }
                    res.send(pack_resp_obj(500, msg))
                });
            }
        }
    },
};


function identify_url_site(url) {  // 站点识别
    var site = null;
    if(/iqiyi\.com/.test(url)){
        // https://www.iqiyi.com/v_19rsiezzrg.html
        site = "iqiyi";
    }else if(/youku\.com/.test(url)){
        // https://v.youku.com/v_show/id_XNDExMTI3NzgxMg==.html
        site = "youku";
    }
    return site
}


function pack_resp_obj(code, msg, data={}) {  // 打包响应对象
    return {
        code: code,
        msg: msg,
        data: data
    }
}
