var request = require('request');  // Http请求函数
var s = require('../libs/youku');  // 优酷加密算法函数
var settings = require('../../settings');

module.exports = function (id, lang) {
    var _m_h5_tk = "b7dcf30d34ba368c92f49670e6c617b4_1553777273321";
    var _m_h5_tk_enc = "77b04eadae2ca067f6a4e0df8eeafe7a";
    var url = gen_url(id, _m_h5_tk.split("_")[0]);
    console.log(url);
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
                'Referer': 'https://v.youku.com/v_show/id_' + id + '.html',
                'Cookie': '_m_h5_tk=' + _m_h5_tk + ';_m_h5_tk_enc=' + _m_h5_tk_enc,
                'Host': 'acs.youku.com'
            }
        }, function (err, res, body) {
            if (err) {
                console.log(err)
            }else {
                try {
                    var json_data = JSON.parse(body.replace("mtopjsonp1(", "").replace(")", ""));
                    var stream = json_data.data.data.stream;
                    var youku_definition_list = settings.definition.youku;
                    var result = [];
                    var is_finished = false;
                    for (var i = 0; i < youku_definition_list.length; i++) {
                        if(is_finished){break}
                        for (var j = 0; j < stream.length; j++) {
                            var item = stream[j];
                            var stream_type = item.stream_type;
                            if(stream_type == youku_definition_list[i]) {
                                result.push({
                                    byte_size: item.size,
                                    start_msec: 0,
                                    duration: item.milliseconds_video,
                                    url: item.m3u8_url,
                                });
                                resolve(result);
                                is_finished = true;
                                break
                            }
                        }
                    }
                    var lists = [];

                }catch (e) {
                    reject(e)
                }
            }
        })
    });
};

function gen_url(video_id, token) {
    var host = "https://acs.youku.com";
    var path = "/h5/mtop.youku.play.ups.appinfo.get/1.1/";
    var jsv = "2.4.16";
    var api = "mtop.youku.play.ups.appinfo.get";
    var v = "1.1";
    var timeout = "20000";
    var YKPid = "20160317PLF000211";
    var YKLoginRequest = "true";
    var AntiFlood = "true";
    var AntiCreep = "true";
    var type = "jsonp";
    var dataType = "jsonp";
    var callback = "mtopjsonp1";

    var t = (new Date).getTime();
    var appKey = "24679788";
    var steal_params = {
        "ccode": "0502",
        "client_ip": "192.168.1.1",
        "utid": "iiEJFeiCBSUCASRm0JoxXDuK",  // todo
        "client_ts": parseInt((new Date).getTime() / 1e3),
        "version": "1.2.5",
        "ckey": "115#1U4nY11O1TZGIDO9M1fW1CsolW1QSJn3104pNgvMy1i2qFZ1YdJWy59jUHJfV5c61tGfVaF1+HZZazWjyry9ASfrrK1vzJEdi/JJhUU4AkNca8pAurPQOSfyetT8ukZQgQkRhEPCOSgUCY9XuzFZASAyeKT8ukNQiFMJhUU4AWNcaB6fyzFQOSRlTRDv5BWQCrW5H6F65jeQSFAFFKjH17Qffq4xHYqjMxk+feAsVNblAvn0u5OVKNLeU3vxPNaVVLEXiFujHk/w4A9uinF918WwJ/UccNZshGkQ8hC5u9uClF0xdx1/4QfXagEXMQHmf0doVuCXPOgAq69ULJ/Vhz6jFdBTSIGQs1qtkyZ8xn4mjsQs+JFq8owzA6nu+dshJ5Esbr/UpRTOCHcKDqq0GIFoCsJWvC1jzNrwWrQ8tZTUD9s1UMf4R7bjqjYatQMGFwn7RR9r+1S8AbQHlDPj2/kcvp/lRP/CRquM0UQXy45zbEXqzObsYTm175VZdlZs+KEhxGLAd+SHUX9ykmAp0wMBlDA9xKSCsAAhQlMtfFSLVEHzdqEfNGtiyNXF3caP3ul2n0qq16flG0D0ZSKSRZEOj9JgCizKIev8aYWD7v3ytJWAUGrvZIMmpwGBmVl0WQjKyLDYl9sVAxKUdFTRnMO802k1PolR5Y0NV5JwZRkc9T3/MSJu"  // todo
    };
    var biz_params = {
        "vid": video_id,
        "current_showid": "416794",
        "master_m3u8": 0,
        "play_ability": 1024,
        "media_type": "standard",
        "app_ver": "1.2.5"
    };
    var ad_params = {
        "vs": "1.0",
        "pver": "1.2.5",
        "sver": "1.1",
        "site": 1,
        "aw": "w",
        "fu": 0,
        "d": 0,
        "bt": "pc",
        "os": "win",
        "osv": "10",
        "dq": "auto",
        "atm": "",
        "partnerid": "null",
        "wintype": "interior",
        "isvert": 0,
        "vip": 0,
        "emb": "AjEwMjczMjg5NjQCZ3VhbmdoZS55b3VrdS5jb20CLw==",
        "p": 1,
        "rst": "mp4",
        "needbf": 2
    };
    var data = JSON.stringify({
        "steal_params": JSON.stringify(steal_params),
        "biz_params": JSON.stringify(biz_params),
        "ad_params": JSON.stringify(ad_params)
    });
    var data_tmp = "{\"steal_params\":\"{\\\"ccode\\\":\\\"0502\\\",\\\"client_ip\\\":\\\"192.168.1.1\\\",\\\"utid\\\":\\\"iiEJFeiCBSUCASRm0JoxXDuK\\\",\\\"client_ts\\\":1553767195,\\\"version\\\":\\\"1.2.5\\\",\\\"ckey\\\":\\\"115#1UegwC1O1Taj7GVXM1f01CsokW1sSJn3104pNgvMy1i2qFZ1oOWWy5OJUZX5V5c6195FGaF1cvV0c8efzzEdc0Azoxg8ukNQi/JJhaUzAkdDaLBXy51QOSfyeK1G16NQiQXRUkzbvBNDaGwfurrQOSfyeKT4kkNQi/JJhUUzAkNDaL6ACRTmV/qyT01GO6F65jeQSFAFFKjH17Qffq4xHYqjMxk+feVsmcI8Avn0u5OVK1hhaxxnrU04RF/jnoGwiTCZUGWeVxowq382xhuM/R49HzwaMS9uTsUmbwCdWOQb7eR0KF5/CZ5FcGcdHipyQ1sXPYmKZc7ObgYuZJlxzrgFfijY5yo8X2Qp849JLkxOzxR2581e6K1jTuKQ29CpNSuphUGJVYtkgFT8nRsP96O2Z/n7l9zljQ5+2t5VggJvATvN2JDmo3AKYNWQAmUBrkHQclKNi6z+i23E+bhDeJAbauQgAYumn0BAANWwMxmktoAwD2/20taf4shSO/LlMPEfO+Jj7k2L3RqxE6svNOB1CNgtm0xS6KU+bzyNSyhp6B+060O1jbIfcxbR9AlxRvVtlE7ZaFzqO702bG9uXELXKiO41WWoqg93s4iWqPkoCCMRtrFpe3MPW9aXHoTwjIFlG8rm8yenIOnWdoykscmVxt4De2dGPO93UGGaNGSEg4f=\\\"}\",\"biz_params\":\"{\\\"vid\\\":\\\"XNDEwOTMxNTg1Ng==\\\",\\\"current_showid\\\":\\\"416794\\\",\\\"master_m3u8\\\":0,\\\"play_ability\\\":1024,\\\"media_type\\\":\\\"standard\\\",\\\"app_ver\\\":\\\"1.2.5\\\"}\",\"ad_params\":\"{\\\"vs\\\":\\\"1.0\\\",\\\"pver\\\":\\\"1.2.5\\\",\\\"sver\\\":\\\"1.1\\\",\\\"site\\\":1,\\\"aw\\\":\\\"w\\\",\\\"fu\\\":0,\\\"d\\\":\\\"0\\\",\\\"bt\\\":\\\"pc\\\",\\\"os\\\":\\\"win\\\",\\\"osv\\\":\\\"10\\\",\\\"dq\\\":\\\"auto\\\",\\\"atm\\\":\\\"\\\",\\\"partnerid\\\":\\\"null\\\",\\\"wintype\\\":\\\"interior\\\",\\\"isvert\\\":0,\\\"vip\\\":0,\\\"emb\\\":\\\"AjEwMjczMjg5NjQCZ3VhbmdoZS55b3VrdS5jb20CLw==\\\",\\\"p\\\":1,\\\"rst\\\":\\\"mp4\\\",\\\"needbf\\\":2}\"}";
    var sign = s(token + "&" + t + "&" + appKey + "&" + data);

    return host + path + "?jsv=" + jsv + "&appKey=" + appKey + "&t=" + t + "&sign=" + sign + "&api=" + api +
    "&v=" + v + "&timeout=" + timeout + "&YKPid=" + YKPid + "&YKLoginRequest=" + YKLoginRequest +
    "&AntiFlood=" + AntiFlood + "&AntiCreep=" + AntiCreep + "&type=" + type + "&dataType=" + dataType +
    "&callback=" + callback + "&data=" + encodeURIComponent(data);
}
