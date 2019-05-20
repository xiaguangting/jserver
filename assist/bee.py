import json
import os
import re
import sys

import requests
from tqdm import tqdm


def iqiyi(play_url):
    resp = requests.get(play_url)
    pattern1 = re.compile("param\['tvid'\] = \"(\d*)\";")
    pattern2 = re.compile("param\['vid'\] = \"(.*?)\";")
    pattern3 = re.compile("<title>(.*?)</title>")
    tvid = pattern1.findall(resp.text)[0]
    vid = pattern2.findall(resp.text)[0]
    name = pattern3.findall(resp.text)[0]
    url = "http://39.105.194.66:3000/crack/?url=" + play_url
    resp = requests.get(url)
    json_data = json.loads(resp.text)
    print url
    index = 1
    video_list = []
    for i in tqdm(json_data["data"]["lists"]):
        print i["url"]
        video_address = json.loads(requests.get(i["url"]).text).get("l")
        resp = requests.get(video_address)
        if not os.path.exists("video/%s" % name):
            os.makedirs("video/%s/list" % name)
        with open("video/%s/list/%s.f4v" % (name, index), 'wb') as f:
            f.write(resp.content)
        with open("video/%s/index.txt" % name, 'a') as f2:
            f2.write("file 'list/%s.f4v'\n" % index)
        index += 1
    with open("video/%s/merge.bat" % name, 'w') as f3:
        f3.write("ffmpeg -f concat -i index.txt -c copy play.f4v")


def run(callback, *args):
    callback(*args)


if __name__ == "__main__":
    cml_args = sys.argv
    run(iqiyi, cml_args[1])