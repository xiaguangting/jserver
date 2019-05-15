# 概述
> 这是一个用JS写的WEB服务   
> 它可以提取视频站点的视频地址

# 环境
> nodejs
<pre>
wget https://npm.taobao.org/mirrors/node/v10.3.0/node-v10.3.0-linux-x64.tar.xz
xz -d node-v10.3.0-linux-x64.tar.xz
tar -vxf node-v10.3.0-linux-x64.tar -C /opt
ln -s /opt/node-v10.3.0-linux-x64/bin/node /usr/local/bin
ln -s /opt/node-v10.3.0-linux-x64/bin/npm /usr/local/bin
</pre>

# 部署

> 相关脚本   
>> 安装依赖包脚本：install_package.sh   
>> 直接启动脚本：jserver.sh   
>> 服务控制脚本：init.d/jserver   

> 服务部署
>> 执行安装依赖包脚本   
>> 执行服务控制脚本
