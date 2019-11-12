# Ajax

## 1. 执行模式

JavaScript语言的执行环境是“单线程”，所谓“单线程”，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务。

为了解决这个问题，JavaScript将任务的执行模式分为两种：同步（Synchronous）和异步（Asynchronous）。

+ **"同步模式"**就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；
+ "**异步模式"**则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

## 2. Ajax 简介

而 Ajax， 即“*Asynchronous  Javascript And XML*”（异步 JavaScript 和 XML），可以在页面不刷新的情况下向服务器发送HTTP请求，并使用 JavaScript 处理返回的结果。

## 3. Ajax包含的技术

Ajax 不是一种新的编程语言，而是一种用于创建更好更快以及交互性更强的Web应用程序的技术。

由下列技术组合而成：

+ 使用 css 和 hmtl 来表示。
+ DOM模型来交互和动态显示。
+ 使用 XMLHttpRequest 来和服务器进行异步通信。
+ 使用 JavaScript 来绑定和调用。

## 4. Ajax 的工作原理

![img](https://images2018.cnblogs.com/blog/1149203/201805/1149203-20180523172650318-867074931.png)

XHR就是 XMLHttpRequest的缩写，是 Ajax 的核心，通过它来处理异步请求。

## 5.  XMLHttpRequest常用的属性和方法

### 5.1 创建 XMLHttpRequest 对象

所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。IE5 和 IE6 使用 ActiveXObject）。

为了应对所有的现代浏览器，包括 IE5 和 IE6，请检查浏览器是否支持 XMLHttpRequest 对象。如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 ActiveXObject ：

```js
var xmlhttp;
if(window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```

### 5.2 XMLHttpRequest对象常见属性

XMLHttpRequest对象的常见属性如下：

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 存储函数（或函数名），每当readyState的属性改变时，就会调用该函数。 |
| readyState         | 存有的XMLHttpRequest的状态从0到4发生变化。<br>0：请求未初始化<br>1：服务器连接已建立<br>2：请求已接收<br>3：请求处理中 <br/>4：请求已完成，且响应已就绪 |
| reponseText        | 以文本形式返回响应。                                         |
| responseXML        | 以XML格式返回响应                                            |
| status             | 将状态返回为数字（例如，“Not Found”为404，“OK”为200）        |
| statusText         | 以字符串形式返回状态（例如，“Not Found”或“OK”）              |

### 5.3 XHR 请求

如需将请求发送到服务器，就需要使用 XMLHttpRequest 的 `open()` 和 `send()` 方法：

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| open(method, url, async) | 规定请求的类型、URL以及是否异步处理请求。<br> *method：* 请求的类型，GET 或 POST<br> *url：* 文件在服务器上的位置<br> *async：* true（异步）或 false（同步） |
| send(string)             | 将请求发送到服务器。<br> *string：*仅用于 POST 请求          |

**(1) GET 请求**

如果希望通过 `GET` 方法发送消息，请向 URL添加信息：

```js
xmlhttp.open("GET","demo_get2.html?fname=Henry&lname=Ford",true);
xmlhttp.send();
```

`GET` 请求具有以下的几个特点：

+ `GET` 请求可被缓存；
+ `GET` 请求保留在浏览器历史记录中；
+ `GET` 请求可被收藏为书签；
+ `GET` 请求不应再处理敏感数据时使用；
+ `GET` 请求有长度限制；
+ `GET` 请求只应当用于取回数据。

**(2) POST 请求**

如果需要像 HTML 表单那样 POST 数据，请使用`setRequestHeader()`来添加 HTTP 头。然后在`send()`方法中规定希望发送的数据：

```js
xmlhttp.open("POST","ajax_test.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");
```

`POST` 请求具有以下的几个特点：

+ `POST` 请求不会被缓存；
+ `POST` 请求不会保留在浏览器历史记录中；
+ `POST` 请求不能被收藏为书签；
+ `POST` 请求对数据没有长度限制。

| 方法                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| setRequestHeader(header, value) | 向请求添加HTTP头<br> *header：* 规定头的名称<br> *value：* 规定头的值 |

### 5.4 XHR 响应

由于 HTTP 响应是由服务端发出的，并且服务器作出相应需要时间，所以需要监听服务器响应的状态，然后才能进行处理。

+ **状态行**

`xhr.status` 状态码：200、304、404等；

+ **响应主体**

`xhr.responseText` 与 `xhr.responseXML` 都表示响应主体。

| 属性         | 描述                       |
| ------------ | -------------------------- |
| responseText | 获得字符串形式的响应数据。 |
| responseXML  | 获得 XML 形式的响应数据。  |

### 5.5 XHR readyState

**Ajax - onreadystatechange **

***

　当发送一个请求后，客户端需要确定这个请求什么时候会完成，因此，XMLHttpRequest对象提供了`onreadystatechange` 事件机制来捕获请求的状态，继而实现响应。

每当`readyState`改变时，就会触发`onreadystatechange`事件。

`　readyState`属性存有 XMLHttpRequest 的状态信息：

+ **0：请求未初始化**
  
+ 此阶段确认 XHR 是否创建，并为调用 `open` 方法进行初始化做好准备，*值为 0表示 XHR 已经存在*，否则浏览器会报错：对象不存在。
  
+ **1：服务器连接已经建立**
  
+ 此阶段对 XHR 进行初始化，即调用 `open` 方法，根据参数完成对象状态的设置，并调用 `send` 方法开始向服务器发送请求。*值为 1 表示正在向服务端发送请求*。
  
+ **2：请求已接收**

  + 　此阶段接收服务器端的响应数据。但获得的还只是服务端响应的原始数据，并不能直接在客户端使用。

      　**值为 2 表示已经接收完全部响应数据**，并为下一阶段对数据解析作好准备。

+ **3：请求处理中**

  + 此阶段解析收到的服务端相应数据，即根据服务器响应头部返回的 [MIME类型](https://www.w3school.com.cn/media/media_mimeref.asp) 把数据转换为能通过 `responseBody`，`responseText` 或 `responseXML` 的属性存取的格式，为在客户端调用做好准备。

    *值为 3 表示正在解析数据。*

+ **4：请求已经完成，且响应已就绪**
  
  + 此阶段确认全部数据都已经解析为客户端可用的格式，解析已经完成。*值为4表示数据解析完毕。*

```
总结可知，整个 XHR 的生命周期包含如下阶段：

1. 创建
2. 初始化请求
3. 发送请求
4. 接收数据
5. 解析数据
6. 完成
```

在`onreadystatechange`事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

当`readyState`等于 4 且状态为 200 时，表示响应已就绪：

