# 诊断并输出日志到控制台<a src="https://developers.google.com/web/tools/chrome-devtools/console/console-write" />原文</a>

* 控制台日志是一个非常强大的检查页面或者应用的方式，让我们用console.log 开始，然后探索一些更高级的使用

## 主要由以下几点

* console.log
* console.error console.warn, console.info
* console.group console.groupEnd (将相关的信息分组，避免杂乱)
* console.assert  显示条件型报错信息


### 输出到控制台

* 使用 console.log() 方法来打印一些基本信息。 这个方法可以接受多个参数或者表达式，然后以空格分隔的形式连接多个参数打印到控制台。
* 执行以下代码：

```javascript
console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
```
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-write-log-multiple.png"/>

### 自动补全命令

* 当你在控制台输入命令时，控制台会自动展示一个符合已输入文字的自动补全下拉列表菜单， 菜单中也会包含你已经执行的命令。
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/autocomplete.png" />

* 组织控制台输出

    * 聚合信息： 你可以将相关的信息聚合到一起来展示。console.group() 命令接受一个字符串去设置组的名称， 在JS中调用之后， 控制台就会开始将后来的输出聚合到一起，直到你使用console.groupEnd() 。

```javascript 
var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();
```

<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-write-group.png" />

* 嵌套分组
    * 日志的分组也可以嵌套使用

```javascript
var user = "jsmith", authenticated = true, authorized = true;
// Top-level group
console.group("Authenticating user '%s'", user);
if (authenticated) {
    console.log("User '%s' was authenticated", user);
    // Start nested group
    console.group("Authorizing user '%s'", user);
    if (authorized) {
        console.log("User '%s' was authorized.", user);
    }
    // End nested group
    console.groupEnd();
}
// End top-level group
console.groupEnd();
console.log("A group-less log trace.");
```

<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-write-nestedgroup.png" />

* 自动折叠的分组

    * 当分组功能使用过多时， 折叠分组就非常有用了，使用console.groupCollapsed()

### 报错和警告

* 报错和警告信息和普通的Log是一样的， 只是他们有不同的样式来引起你的注意。
 
* 错误 会在显示的时候在左侧有个红色的图标，并且文字为红色的
* 警告会在显示的左侧有一个黄色的⚠️图标。

### 断言

* console.assert() 方法会在第一个参数结果为 false的时候显示一个报错提示的字符串

* 一个简单的例子
```javascript
console.assert(list.childNodes.length < 500, "Node count is > 500");
```
<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-write-assert-failed.png" />


### 字符串替换和格式化

* console.log() 第一个参数可以接受包含一个或者多个占位符(说明符？)的字符串，占位符一般的格式是 % 加上一个表明其格式的英文字母。 后面的参数会在输出的时候会按照顺序替换占位符。

* 简单的一个例子： 

```javascript

console.log("%s has %d points", "Sam", 100);
```

* 占位符有以下几种：

| Specifier |  Output|
| ---------- | :---------:|
|%s | 字符串|
|%i or %d  |  整数|
|%f | 浮点型 |
|%o | 可展开的Dom 元素， 就像在inspect elements 看到的一样|
|%O | 可展开的对象 |
|%c | 把第二个参数中的css样式应用到输出结果|

```javascript
// 试下这个
console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
```

### 用css美化控制台输出

* css 说明符允许你自定义控制台的输出。把你要输出的字符串开始处增加css说明符，然后把你想要的样式当做第二个参数传递进去。

```javascript
console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");

// 所以很多时候打开控制台看到别的网站打印的东西就是用到这个哦。

// 还可以显示图片,

console.log('%c ', 'background: url("https://github.com/fluidicon.png");background-size: 100px;font-size:90px')

```

<img src="https://developers.google.com/web/tools/chrome-devtools/console/images/console-write-format-string.png" />



### 把DOM元素格式化为JS 对象

    - 一般情况下， Dom元素在输出的时候会显示的是整个的HTML字符串。 如果你想要查看Dom对象以及他的属性properties， 你就需要 %o 说明符， 或者使用console.dir 。
    <img src="https://developers.google.com/web/tools/chrome-devtools/console/images/dir-element.png" />



<small>上次更新日期： 十二月 21, 2016</small>
