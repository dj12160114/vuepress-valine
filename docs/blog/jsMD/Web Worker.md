# Web Worker

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

Web Worker 有以下几个使用注意点：

+ **同源限制**
  + 分配给 worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
+ **DOM限制**
  + Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。
+ **通信联系**
  + Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
+ **脚本限制**
  + Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
+ **文件限制**
  + Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。



## 1. 基本用法

### 1.1 主线程

主线程采用 new 命令，调用 Worker() 构造函数，新建一个 Worker 线程。其中，构造函数的参数是一个脚本文件，该文件就是 Worker 线程要执行的任务，由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。

主线程调用`worker.postMessage()`方法，向 Worker 发消息。参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

```js
var worker = new Worker('work.js');
// 主线程发送消息
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});

// 主线程接收子线程发回来的消息

worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
```

Worker 完成任务以后，主线程就可以把它关掉。

```js
worker.terminate();
```



### 1.2 Worker线程

Worker 线程内部需要有一个监听函数，监听`message`事件。

> ```javascript
> self.addEventListener('message', function (e) {
>   self.postMessage('You said: ' + e.data);
> }, false);
> ```

上面代码中，`self`代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。

 ```javascript
 // 写法一
 this.addEventListener('message', function (e) {
   this.postMessage('You said: ' + e.data);
 }, false);
 
 // 写法二
 addEventListener('message', function (e) {
   postMessage('You said: ' + e.data);
 }, false);
 ```

除了使用`self.addEventListener()`指定监听函数，也可以使用`self.onmessage`指定。监听函数的参数是一个事件对象，它的`data`属性包含主线程发来的数据。`self.postMessage()`方法用来向主线程发送消息。

`self.close()`用于在 Worker 内部关闭自身。

### 1.3 Worker 加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。该方法可以同时加载多个脚本。

 ```javascript
 importScripts('script1.js', 'script2.js'
 ```

### 1.4 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。

 ```javascript
 worker.onerror(function (event) {
   console.log([
     'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message>   ].join(''));
 });
 
 // 或者
 worker.addEventListener('error', function (event) {
   // ...
 });
 ```



## 2. 数据通信

主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是**传值**而不是传址，Worker 对通信内容的修改，不会影响到主线程。

但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做[Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。

```javascript
// Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
```



## 3. 同页面的 Web Worker

通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

```markup
 <!DOCTYPE html>
   <body>
     <script id="worker" type="app/worker">
       addEventListener('message', function () {
         postMessage('some message');
      }, false);
     </script>
   </body>
 </html>
```

上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

 ```javascript
 var blob = new Blob([document.querySelector('#worker').textContent]);
 var url = window.URL.createObjectURL(blob);
 var worker = new Worker(url);
 
 worker.onmessage = function (e) {
   // e.data === 'some message'
 };
 ```

