# 概述
> 这是一个用JS写的WEB服务   
> 它可以提取视频站点的视频地址   
> 现支持对爱奇艺，优酷视频播放页的视频源地址提取

# 环境
> nodejs
<pre>
wget https://npm.taobao.org/mirrors/node/v10.3.0/node-v10.3.0-linux-x64.tar.xz
xz -d node-v10.3.0-linux-x64.tar.xz
tar -vxf node-v10.3.0-linux-x64.tar -C /opt
ln -s /opt/node-v10.3.0-linux-x64/bin/node /usr/local/bin
ln -s /opt/node-v10.3.0-linux-x64/bin/npm /usr/local/bin
</pre>

# 代码
<pre>
jserver
	init.d  // 服务脚本
		jserver
	src  // 源码
		control  // 控制
			router.js  // URL路由
			scheduler.js  // 调度处理器
			handlers  // 处理的主要JS
				iqiyi.js
				youku.js
			libs  // 依赖的JS
				iqiyi.js
				youku.js
		jserver.js  // Http服务主JS
		settings.js  // 配置JS
		package.json  // 相关说明
		package-lock.json  // 锁定包
		node_modules  // 第三方包文件夹，不用理会
	install_package.sh  // 更新包脚本，一般在第一次部署执行或者有新包加入
	jserver.sh  // 直接运行脚本
</pre>

# 配置
> 文件路径：src/settings.js   
> 配置项
>> port：端口   
>> iqiyi：爱奇艺
>>> account：账户  
>>>> id：用户ID    
>>>> token：用户时效Token

# 部署

> 相关脚本   
>> 安装依赖包脚本：install_package.sh   
>> 直接启动脚本：jserver.sh   
>> 服务控制脚本：init.d/jserver   

> 服务部署
>> 执行安装依赖包脚本   
>> 执行服务控制脚本
