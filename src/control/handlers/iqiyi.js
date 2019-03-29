var settings = require('../../settings');
var md5 = require('md5-node');
var request = require('request');  // Http请求函数
var cmd5x = require('../libs/iqiyi');  // 爱奇艺加密算法函数

module.exports = function (url) {
    return new Promise((resolve, reject) => {
        get_video_id(url, resolve, reject)
    });
};


function get_video_id(url, resolve, reject) {
    request({
        method: 'get',
        url: url,
        headers: {
            'User-Agent': settings.user_agent[0]
        }
    }, function (err, res, body) {
        if (err) {
            console.log(err)
        }else {
            try {
                var tvid = /param\['tvid'\] = "(\d*)";/.exec(body)[1];
                var vid = /param\['vid'\] = "(.*?)";/.exec(body)[1];
            } catch (e) {
                reject("IQIYI video id extraction failed");
                return
            }
            get_data(gen_url(tvid, vid), resolve, reject);
        }
    })
}


function gen_url(tvid, vid) {
    var domain = "https://cache.video.iqiyi.com";
    var tm = (new Date).getTime();
    var authKey = "";
    var pck = settings.iqiyi.account[0].token;  // 用户登入token
    var query = "/dash?tvid=" + tvid + "&bid=600&vid=" + vid + "&src=01010031010000000000&vt=0&rs=1&uid=1692811519&ori=pcw&ps=1&tm=" + tm + "&qd_v=1&k_uid=511522715bec2deac59da08dc190d974&pt=0&d=0&s=&lid=&cf=&ct=&ve=" + authKey + "&k_tag=1&ost=0&ppt=0&dfp=a001c902c83312491a8c360829bf091b707a1b1906a66438d04bb74302def9bbd8&locale=zh_cn&prio=%5B%7B%22code%22%3A2%2C%22dr%22%3A-1%7D%5D%0A&pck=" + pck + "&k_err_retries=0&k_ft1=143486267424772&k_ft4=0&bop=%7B%22version%22%3A%227.0%22%2C%22dfp%22%3A%22a001c902c83312491a8c360829bf091b707a1b1906a66438d04bb74302def9bbd8%22%7D&ut=1&ut=5";
    return domain + query + "&vf=" + cmd5x(query);
}


function get_data(url, resolve, reject) {
    request({
        method: 'get',
        url: url,
        headers: {
            'User-Agent': settings.user_agent[0]
        }
    }, function (err, res, body) {
        if (err) {
            console.log(err)
        } else {
            try {
                var json_data = JSON.parse(body.replace("var tvInfoJs=", ""));
                var video = json_data.data.program.video;
                var boss = json_data.data.boss;
                var t = boss ? boss.data.t : "";
                var ptime = boss ? boss.data.ptime : "";
                var lists = [];
                for (var i = 0; i < video.length; i++) {
                    if (video[i]._selected) {
                        var fs = video[i].fs;
                        for (var j = 0; j < fs.length; j++) {
                            var byte_size = fs[j].b;
                            var start_msec = fs[j].s;
                            var duration = fs[j].d;
                            var url = gen_video_url(fs[j].l, t, ptime);
                            lists.push({
                                byte_size: byte_size,
                                start_msec: start_msec,
                                duration: duration,
                                url: url,
                            })
                        }
                        resolve(lists);
                        break;
                    }
                }
            } catch (e) {
                reject(e)
            }
        }
    })
}


function gen_video_url(path, t, ptime){  // 获取二级链接
    var domain = "https://data.video.iqiyi.com/videos";
    if(t){  // VIP视频
        var ibt = cmd5x(t + get_filename(path));
        var QY00001 = settings.iqiyi.account[0].id;
        var qyid = "";
        var qypid = "";
        return domain + path + "&cross-domain=1&qyid=" + qyid + "&qypid=" + qypid + "&t=" + t + "&vid=" + vid + "&ibt=" + ibt + "&cid=afbe8fd3d73448c9&ib=4&ptime=" + ptime + "&qypid=" + qypid + "&QY00001=" + QY00001;
    }else{  // 非VIP视频
        return domain + path;
    }
}


function get_filename(url) {  // 获取链接中的文件名
    return url.match(/\/([^/]*?)\?/)[1].split(".")[0];
}
