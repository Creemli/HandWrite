# 如何 解决npm包依赖版本问题

## 问题描述：

    * 开发项目中经常遇到npm包兼容问题
    * package.json 中写法一般是大于某个版本， 但是有时候npm包会有重大更新， 会引起项目无法正常运行
    * package.json 中如果写死某个版本，那么将无法应用到新的更新， 如性能的优化等
    * npm install 有时会因为墙而无法完成， 此时无法确认到底已经安装了哪些包

## 解决方案
    
    * 引入Yarn， 使用yarn.lock 文件固定可用的npm包版本
    * 搭建私有cnpm仓库， 解决墙的问题， 引入项目中已封装好的类库
    * 使用nrm 管理仓库地址


# 开始i

## 安装homebrew,

* 安装命令
```javascipt
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* 如果不成功， 需要更新一下mac中的ruby环境。自行Google

* brew install yarn

* yarn --version  (目前是0.20)



## 安装nrm (帮助我们快速切换npm源， 不推荐使用cnpm命令)

* sudo npm install -g nrm 


* nrm ls (查看有哪些可用的源，默认有npm官方源， 淘宝等)


* nrm add yzt http://172.24.242.18:7001   (添加cnpm已经搭建好的私有源仓库)

* nrm use yzt (使用某个源)



## 项目搭建完毕之后使用 yarn install 安装依赖， 此时会生成yarn.lock 文件。


## 提交此文件后， 其他同事在使用yarn install下载的时候所有的包将与你当前的一致。



## 这些东西我会加入到我们的脚手架中
