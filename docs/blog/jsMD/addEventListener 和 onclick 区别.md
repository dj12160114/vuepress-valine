# addEventListener 和 onclick 区别

### onclick

+ 优点
  + 简洁

+ 缺点
  + 不能对事件捕获或冒泡进行控制，只能使用事件冒泡，无法切换
  + 一次只能对一个元素绑定一个事件处理程序，如重复定义多个事件，则前面的会被后面的事件覆盖。

### addEventListener

+ 优点
  + 允许给一个元素绑定多个事件监听器。
  + 可以控制事件监听器触发阶段采用捕获还是冒泡。
  + 对任何DOM元素都是有效的，不仅仅对 HTML 元素有效

addEventListenert 方法有三个参数：

+ 第一个：填写事件名，注意不需要写on，
+ 第二个：可以是一个函数
+ 第三个：是指在冒泡阶段还是捕获阶段处理事件处理程序，第三个参数可以省略，大多数情况也不需要用到第三个参数,不写第三个参数默认false。
  + true：代表捕获阶段处理
  + false：代表冒泡阶段处理

**注意**：`addEventListener`——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8，如果要兼容 IE7、8，需要使用 `attachEvent`。

**区别：**

1. attachEvent中的事件带on   而addEventListener中的事件不带on。

```js
if(obj.addEventListener){
     obj.addEventListener(events,fn,false);
}
else{
     obj.attachEvent('on'+events,fn);
}
```

2. 参数个数不同：
   + attachEvent方法两个参数：第一个参数为事件名称，第二个参数为接收事件处理的函数； 
   + addEventListener 有三个参数：第一个参数表示事件名称（不含 on，如 "click"）；第二个参数表示要接收事件处理的函数；第三个参数是一个bool值，false 表示采用 冒泡机制，true 表示采用事件捕获机制

