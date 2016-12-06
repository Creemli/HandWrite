摘抄自：https://segmentfault.com/a/1190000000368906

cnpm是企业内部搭建npm镜像和私有npm仓库的开源方案。它同时解决了现有npm架构的一些问题。

为什么企业需要私有NPM
主要有如下理由：

确保npm服务快速、稳定：对于企业来说，上线生产系统的时候，需要花半小时甚至更久等待npm模块依赖安装完毕，是不可接受的。部署镜像后，可以确保高速、稳定的npm服务。
发布私有模块：官方的npm上的模块全部是开源的。一些与企业业务逻辑相关的模块可能不适合开源。这部分私有的模块放在私有NPM仓库中，使用起来各种方便。
控制npm模块质量和安全：npm上的模块质量参差不齐，搭建私有仓库，可以更严格地控制模块的质量和安全，只有经过审核的模块才允许被加入私有仓库。
cnpm的特点
压缩包等文件从数据库中分离，放在CDN上，减轻了数据库的压力，提高了访问速度。
使用MySQL替换了CouchDB，更容易部署。同时由于大部分开发者更熟悉MySQL，因此架设起来更方便。
CDN和MySQL都可以方便地扩展。


5分钟部署
部署cnpm只需5分钟。

依赖

Node
MySQL
Redis
qiniu CND (或其他CDN)
部署过程

获取代码

git clone git://github.com/fengmk2/cnpmjs.org.git $HOME/cnpmjs.org
cd $HOME/cnpmjs.org
创建MySQL表

; mysql -u yourname -p
mysql> use cnpmjs;
mysql> source docs/db.sql
然后编写配置文件config/config.js：

module.exports = {
    debug: false,
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'cnpmjs',
        password: 'cnpmjs123',
      }
    ],
    mysqlDatabase: 'cnpmjstest',
    redis: {
      host: 'localhost',
      port: 6379,
    },
    nfs: null, //use your own CND here
    enablePrivate: true, // enable private mode, only admin can publish, other use just can sync package from source npm
    admins: {
      admin: 'admin@cnpmjs.org',
    },
    syncModel: 'exist'
  };
安装依赖

make install
启动

; npm run start

Starting cnpmjs.org ...
Start nodejs success. PID=27175
好了，部署完成！

客户端设置
服务跑起来之后，企业员工需要在自己的电脑上配置下客户端。

# 资源仓库（基于cnpm）

  * 只是用来存放一些公司的npm包

## Registry
  * http://45.32.32.61:7001

<script src="/js/readme.js"></script>

## 上传的包列表
<a href="./privates">列表</a>

## Usage

最建议的做法：

```bash
$ npm install @yzt/native_h5 --registry=http://45.32.32.61:7001
```

或者：

use our npm client [cnpm](https://github.com/cnpm/cnpm)(More suitable with cnpmjs.org and gzip  support), you can get our client through npm:

```bash
$ npm install -g cnpm --registry=http://45.32.32.61:7001

$ cnpm install @yzt/native_h5
```

Or you can alias NPM to use it:

```bash
alias cnpm="npm --registry=http://45.32.32.61:7001 \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/mirrors/node \
--userconfig=$HOME/.cnpmrc"

#Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/mirrors/node \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

注意，目前cnpm的权限控制比较简单，只有admin用户有权publishNPM模块。如果你的企业需要灵活的权限控制，需要自行开发。
