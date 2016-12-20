# 概览 <a href="https://developers.google.com/web/tools/chrome-devtools/console/">原文</a>

## 使用控制台

* 学习如何打开开发者控制台
* 查看堆栈信息或者显示其所在位置
* 过滤或者清除输出内容以及保存输出内容到文件，
* 控制台设置相关


### 打开控制台

* 打开一个全屏的，专用的面板:
    * 快捷键： Ctrl+Shift+J (Windows / Linux) or Cmd+Opt+J (Mac)
    * 如果开发者工具已经打开，选择Console按钮
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-panel.png">


* 打开一个几个相邻面板的集合。
    * 使用Esc 可以开速切换到Console
    * 或者点击开发者工具右上角... 然后选择 Show Console.
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-drawer.png">



### 信息堆栈
    * 如果一条信息需要被多次打印，控制台会合并这些信息，然后在信息的最左侧显示打印的次数。 
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/message-stacking.png" />

    * 如果你倾向于每一条log都显示在独立的一行，请打开 设置中的 Show timestamps
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/show-timestamps.png">

<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/timestamped-console.png" />


### 关于控制台历史记录
    * 清空记录有以下方法
        * 在控制台里单击右键， 选择Clear Console/
        * 在控制台输入 clear();
        * 在代码中调用方法 Console.clear()；
        * 快捷键 Ctrl + L

    * 保留历史记录
        * 选中 Preserve Log 即可。所有的信息都会被保存直到你清除。

    * 保存历史记录
        * 在控制台右键， 选择Save as 即可。


### 选择运行环境上下文
    * 一个位于开发者工具顶部的下拉框。
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/execution-context-selector.png" /> 
    * 大部分的情况，我们会选择top （页面最顶层的容器）
    * 其他的容器和扩展运行在他们自己的上下文。如果你需要操作他们，需要在下拉框中选择对应的容器。 例如， 如果你想看一下iframe 的元素然后修改一个已经存在于上下文中的变量， 你需要选中这个iframe的名称（链接），然后执行代码。
    * 当你操作一个不是top的容器或者扩展时， 开发者工具会高亮当前选中的上下文下拉框。 这是因为开发者很少需要操作top以外的容器， 而且你会非常困惑如果你输入了一个变量，期待输入一个值，但是却看到控制台输出了  undefined
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/non-top-context.png" />


### 过滤控制台输出

    * 点击 Filter 按钮<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/filter-button.png"/> . 你可以选择不同的级别（info, warning ,error 等）， 也可以使用正则来匹配筛选， 也可以隐藏网络请求信息。

<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/filtered-console.png"/>

    * Debug会筛选出  console.timeEnd()  和 console.debug();


### 额外的设置
    * 好多， 以后会整理一个专门的图片。





