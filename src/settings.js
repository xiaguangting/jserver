module.exports = {
    port: 3000,  // 端口
    site: {  // 站点映射
        iqiyi: 1,
        youku: 2
    },
    lang_map: {
        mandarin: {
            "youku": "guoyu"
        },
        english: {
            "youku": "en"
        },
        cantonese: {

        }
    },
    definition: {
        youku: [
            "mp4hd3v2",
            "mp4hd2v2",
            "mp4hd",
            "3gphd",
            "mp4sd",
        ]
    }
};
