# BFC的理解与应用

## 一、BFC概念

`Formatting context(格式化上下文)` 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

而 `BFC` 即 `Block Formatting Contexts（块级格式化上下文） ` ，它属于普通流，具有 `BFC` 特性的元素**可以看作是隔离的独立容器，容器上的元素不会在布局上影响到其他元素，并且具有普通容器没有的特性。**



## 二、触发BFC

只要元素满足下面任一条件即可触发 `BFC` 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cell、table-caption、flex、inline-flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)



## 三、BFC特性及应用

**1. 同一个 BFC 下外边距会发生折叠**

```html
<head>
    <style>
    div {
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
	}
    </style>
</head>
<body>
    <div></div>
    <div></div>
</body>
      
```

![1568167659863](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568167659863.png)

从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

**如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。**

```html
 <head>
    <style>
    .box-wrap {
      display: flex;
    }
     
	 .box{
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }

    </style>
</head>
<div class="box-wrap">
    <div class="box">1</div>
  </div>
  <div class="box-wrap">
    <div class="box">2</div>
  </div>
```

![1568167622098](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568167622098.png)

**2. BFC 可以包含浮动的元素**

浮动的元素会脱离普通流，如下：

```html
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: #eee;float: left;">     
    </div>
</div>

```

![preview](https://pic4.zhimg.com/v2-371eb702274af831df909b2c55d6a14b_r.jpg)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```html
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>

```

![img](https://pic4.zhimg.com/80/v2-cc8365db5c9cc5ca003ce9afe88592e7_hd.png)

**3. BFC 可以阻止元素被浮动元素覆盖**

先来看一个文字环绕效果

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

![img](https://pic4.zhimg.com/80/v2-dd3e636d73682140bf4a781bcd6f576b_hd.png)

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 **overflow: hidden**，就会变成：

![img](https://pic3.zhimg.com/80/v2-5ebd48f09fac875f0bd25823c76ba7fa_hd.png)

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。