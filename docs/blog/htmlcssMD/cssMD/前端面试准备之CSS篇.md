```

本文知识点并非完全由本人总结，参考汇总了许多网上的资料。
感谢各位博主的无私分享，文章末尾已贴出所有参考链接，侵删。

```
<hr>

## 1. 盒模型

 **IE盒模型：width = content + border + padding**
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190802105925500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNTU0MDcx,size_16,color_FFFFFF,t_70)
 
  **标准盒模型：width = content**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190802105901334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNTU0MDcx,size_16,color_FFFFFF,t_70)
 **IE盒模型与标准盒模型的转化**
 	css3中有这样一个属性：box-sizing，这个属性有以下几个值：
 	![在这里插入图片描述](https://img-blog.csdnimg.cn/20190802110353931.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNTU0MDcx,size_16,color_FFFFFF,t_70)==content-box==：默认值，如果设置一个元素的宽、高各为100px，那么这个100px指的是内容区域的宽高，不包括padding、border和margin的设置值。
==border-box==：设置一个元素的宽、高各为100px，那么这个100px指的是内容区域 + border + padding 的值。

**故通过设置box-sizing: border-box可以模拟IE盒模型**。
<hr>

## 2. flex弹性盒模型 
注意，设为 flex布局之后，子元素的<font color=red>float</font>、<font color=red>clear</font>和 <font color=red>vertical-align</font> 属性将失效。

采用flex布局的元素称为 flex 容器，它的所有子元素自动成为容器成员，称为 flex项目。
容器默认存在两根轴，水平主轴（main axis）和垂直交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认按主轴排列，单个项目占据的水平主轴空间叫 **main size**，占据的交叉轴空间叫 **cross size**。

### 2.1 容器的属性 
<hr>
以下6个属性设置在<font color=red>容器</font>上。

```

 flex-direction
 flex-wrap
 flex-flow
 justify-content
 align-items
 align-content

```
**2.1.1 flex-direction属性**

```
.box{
	flex-direction: row | row-reverse | column | column-reverse;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190802144048955.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNTU0MDcx,size_16,color_FFFFFF,t_70)
**2.1.2 flex-wrap属性**
默认情况下，项目排在一条轴线上，flex-wrap 属性定义如果一条轴线排不下，如何换行。

```
.box{
	flex-wrap: nowrap | wrap | wrap-reverse;
}
```
a. ==nowrap==（默认）：不换行。
b. ==wrap==：换行，第一行在上方。
c. ==wrap-reverse==：换行，第一行在下方。

**2.1.3 flex-flow属性**
flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
```
.box{
	flex-flow: <flex-direction>  | |  <flex-wrap>;
}
```

**2.1.4 justify-content属性**
justify-content 属性定义了项目在水平主轴上的对齐方式。
```
.box{
	justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
它可能取5个值，具体对齐方式与轴的方向有关。下面假设水平主轴为从左到右。

```
	flex-start（默认值）：左对齐
	flex-end：右对齐
	center： 居中
	space-between：两端对齐，项目之间的间隔都相等。
	space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
 ```

**2.1.5 align-items属性**
定义了项目在垂直交叉轴上的对齐方式。
```
.box {
   align-items: flex-start | flex-end | center | baseline | stretch;
 }
```
它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

        flex-start：交叉轴的起点对齐。
        flex-end：交叉轴的终点对齐。
        center：交叉轴的中点对齐。
        baseline: 项目的第一行文字的基线对齐。
        stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
   
**2.1.6 align-content属性**
  align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
该属性可能取6个值。


        flex-start：与交叉轴的起点对齐。
        flex-end：与交叉轴的终点对齐。
        center：与交叉轴的中点对齐。
        space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
        space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
        stretch（默认值）：轴线占满整个交叉轴。
      
###  2.2 项目的属性 
<hr>
以下6个属性设置在项目上。

        order
        flex-grow
        flex-shrink
        flex-basis
        flex
        align-self
        
**2.2.1 order属性**
 order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
 
    .item {
      order: <integer>;
    }
   
**2.2.2 flex-grow属性**
  flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  ```
    .item {
      flex-grow: <number>; /* default 0 */
    }
 ```
  如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
  
**2.2.3 flex-shrink属性**
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
    .item {
      flex-shrink: <number>; /* default 1 */
    }
 ```
 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

**2.2.4 flex-basis属性**
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
**2.2.5 flex属性**
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
 ```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

**2.2.6 align-self属性**
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```
    .item {
      align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
 ```
 <hr>

## 3. css单位 ##
|单位| 描述 |
-------|-----
|%|百分比|
| in | 英寸 |
| cm | 厘米 |
| em | 1em 相当于当前的字体尺寸。<br>2em 等于当前字体的两倍。|
| ex | 相对于字符 x 的高度，通常为 字体高度 的一半。|
| pt | 磅（ 1pt = 1/ 72 英寸） |
| pc | 12点活字 |
| px | 像素（计算机屏幕上的一个点）|
<hr>

## 4. css选择器 
常用的选择器：
```
  标签选择器
  ID选择器
  类选择器
  伪类选择器
  属性选择器
  后代选择器
  兄弟选择器
```
下面重点介绍后面几种选择器，前三种不再赘述。

**4.1 伪类选择器**
CSS伪类（pseudo-class）是加在选择器后面的用来指定元素状态的关键字。
```
语法：
selector:pseudo-class {
  property: value;
}
```
详细伪类列表参见[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_Started/Selectors)。

**4.2 属性选择器**
属性选择器根据元素的 属性 和 属性值 来匹配元素。

|选择器| 描述 |
---------------|------
| [ attr ] |  选择包含 attr 属性的所有元素，不论 attr 的值为何。|
| [ attr = val ] | 仅选择 attr 属性值刚好为 val 的元素。<br>**注意：如果除了 val值还有其他属性值则不会匹配到。** |
| [ attr ~= val ] | 选择所有具有 attr 属性且属性值包含 val的元素。<br>即使元素的属性中还包含其他属性值或只有 val 值。|
| [ attr \|= val ] | 选择以 val 值开头的属性值的元素。<br>**注意：val值是整个单词，无论 是单独像 attr = "en"，<br>或者像连字符 - ，如 attr = val-val，但 attr = enus这种不会匹配。** |
| [ attr ^= val ] | 选择attr 属性的值以 val 开头（包括 val）的元素。|
| [attr $= val] | 选择attr属性的值以 val 结尾（包括 val）的元素。|
| [attr *= val]  | 选择attr属性的值中包含子串 val 的元素，val 子串在什么位置不重要。|

**4.3 后代选择器**
|选择器| 描述 |
---------| ------- 
| A B | 匹配B 元素，满足条件：B是A的后代节点（B是A的子节点或子节点的子节点）。 |
| A > B | 匹配B元素，满足条件： B是A的直接子节点。 |

**4.4 兄弟选择器**
| 选择器| 描述 |
----------|-------
| A + B | 匹配B 元素，满足条件：B是A的下一个兄弟节点（AB有相同的父节点，并且B紧跟在A的后面）。|
| A ~ B | 匹配B元素，满足条件：B是A之后的任意一个兄弟节点（AB相同父节点，B在A之后，但不一定紧挨着A）。
<hr>

## 5. 清除浮动 #
### 5.1 为什么要清除浮动 

 - 很多情况下，如果我们使用了float特效，出现margin，padding设置不能正确显示，浮动会导致父级子级之间设置了padding，导致了属性不能正常传达，导致margin不能正常显示，所以我们要清除浮动。
 - 导致背景不能显示，如果对父级设置了背景属性，导致父级不能撑开，会影响到背景图片不能正常打开。
 - 边框不能撑开，由于子级使用了浮动效果，并且已经产生了浮动，父级不能撑开，所以影响边框不会随着内容的变化而变化。
 
 ### 5.2 清除浮动的方法 
 1）添加空标签
 在浮动元素末尾添加一个空的标签，并设置style样式 clear: both即可。
 ```html
 <p class="warp" id="float1"> 
	<h2>1）添加空标签</h2> 
	<p style="float: left;">main</p> 
	<p style="float: right;">side</p> 
	<p style="clear:both;"></p> 
</p> 
```
优点：通俗易懂，容易掌握。
缺点：添加了许多无意义的空标签，不利于维护。

2）父元素设置 overflow: hidden
通过设置父元素overflow值设置为hidden；在IE6中还需要触发 hasLayout ，例如 zoom：1；
 ```html
 <p class="warp" id="float2" style="overflow: hidden; zoom: 1;"> 
	<h2>2）父元素设置overflow</h2> 
	<p style="float: left;">main</p> 
	<p style="float: right;">side</p> 
</p> 
```
优点：不存在结构和语义化问题，代码量少。
缺点：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。

3) 父元素设置 overflow：auto 属性
同样IE6需要触发hasLayout，演示和3差不多。
优点：不存在结构和语义化问题，代码量极少
缺点：多个嵌套后，firefox某些情况会造成内容全选；IE中 mouseover 造成宽度改变时会出现最外层模块有滚动条等，firefox早期版本会无故产生focus等。

5）父元素也设置浮动
优点：不存在结构和语义化问题，代码量极少。
缺点：使得与父元素相邻的元素的布局会受到影响。

6）使用:after 伪元素
需要注意的是 :after是伪元素（Pseudo-Element）。
由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。 
```css
.clearfix:after { 
	content: ""; 
	display: block; 
	height: 0; 
	clear: both; 
	visibility: hidden; 
} 
```
<hr>

## 6. 常见页面布局 
### 6.1 两栏布局 

 - 浮动实现
 ```css
  .box1 .left {
    float: left;
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .box1 .right {
    margin-left: 100px;
    height: 100px;
    background-color: green;
  }
  ```
  ```html
<div class="box1">
	  <div class="left"></div>
	  <div class="right">两列自适应</div>
</div>
 ```
 - 定位实现
 ```css
 .box1{
    position: relative;
    width: 100%;
    height: 100px;
  }
  .box1 .left{
    position: absolute;
    width: 100px;
    height: 100%;
    background-color: red;
  }
  
  .box1 .right{
    margin-left: 100px;
    width: 100%;
    height: 100%;
    background-color: green;
  }
  ```
  ```html
<div class="box1">
	  <div class="left"></div>
	  <div class="right">自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应</div>
</div>
 ```
 - flex实现
  ```css
  .box1{
    display: flex;
    height: 100px;
  }
  .box1 .left{
    width: 100px;
    height: 100%;
    background-color: red;
  }
  
  .box1 .right{
    flex:1;
    height: 100%;
    background-color: green;
  }
  ```
  ```html
  <div class="box1">
	  <div class="left"></div>
	  <div class="right">自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应自适应</div>
</div>
  ```
  
  圣杯布局和双飞翼布局目的是我们希望先加载的是中间的部分，然后再开始加载 left 和 right 两个。
  
### 6.2 圣杯布局 
圣杯布局给最外面加padding, 让 padding-left 和 padding-right 的数值等于left 和 right 的宽度，然后利用相对定位把他们再移动在两旁。

```css
.box{
    padding:  0 100px;/* 留出左右的距离*/
    height: 100px;
  }
  .box .middle {
    float: left;
    width: 100%;
    height: 100%;
    background-color: yellow;
  }
  .box .left {
    float: left;
    width: 100px;
    margin-left: -100%;
    background-color: red;
    position: relative;
    left: -100px;/*往左拉*/
    height: 100%;
  }
  .box .right {
    float: left;
    width: 100px;
    margin-left: -100px;
    background-color: green;
    position: relative;
    right: -100px;
    height:100%;
  }
```
```html
<div class="box">
  <!--注意顺序-->
  <div class="middle">middle</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

### 6.3 双飞翼布局 
跟圣杯布局没多大区别，就是middle的实现不一样，圣杯布局是middle+padding，双飞翼采用子元素+margin。

```css
.box {
    position: relative;
    height: 100px;
  }
  .middle-wrap {
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
  }
  .middle-wrap .middle {
    height: 100%;
    margin: 0 100px; /*留出距离*/
    background-color: yellow;
  }
  .left {
    float: left;
    width: 100px;
    margin-left: -100%;
    height: 100%;
    background-color: red;
  }
  .right {
    float: left;
    width: 100px;
    height: 100%;
    margin-left: -100px;
    background-color: green;
  }
```
```html
<div class="box">
  <div class="middle-wrap">
    <div class="middle"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

<hr>

## 7. 响应式布局 
## 8. css预处理，后处理 
### 8.1 css预处理器 
用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为**目标生成文件**，然后开发者就只要使用这种语言进行编码工作。

预处理器提供 CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性。

目前比较主流的三个处理器分别是 Less、Sass、Stylus。

### 8.2 css后处理器 
css后处理器是对css进行处理，并 **最终生成css预处理器**，它属于广义上的css预处理器

举例：css压缩工具（clean-css）,Autoprefixer(以Can I Use上的浏览器支持数据为基础，自动处理兼容问题)
***
## 9. css3新特性 
### 9.1 css3的选择器

1）E:last-child 匹配父元素的最后一个子元素E。
2）E:nth-child(n)匹配父元素的第n个子元素E。 
3）E:nth-last-child(n) CSS3 匹配父元素的倒数第n个子元素E。

### 9.2 @font-face 特性
Font-face 可以用来加载字体样式，而且它还能够加载服务器端的字体文件，让客户端显示客户端所没有安装的字体。
```css
@font-face {
   font-family: iconfont;
   src: url(//at.alicdn.com/t/font_1465189805_4518812.eot);  
}            
```

### 9.3 圆角
```
border-radius: 15px;
```

### 9.4 阴影
```
.box{
	text-shadow: 5px 2px 6px rgba(64, 64, 64, 0.5);
}
```

### 9.5 渐变效果
```
background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),to(#FE280E));
```
### 9.6 flex弹性盒子模型
详细介绍见文章上部。

### 9.7 CSS3制作特效
1）transition对象变换时的过渡效果
 - transition-property 对象参与过渡的属性
 - transition-duration 过渡的持续时间
- transition-timing-function 过渡的类型
- transition-delay 延迟过渡的时间

2）transform 2D转换效果
 主要包括 translate（水平移动）、rotate（旋转）、scale（伸缩）、skew（倾斜）。
 
3）animation 动画特效果
animation 属性是一个简写属性，用于设置六个动画属性：
- animation-name：规定需要绑定到选择器的 keyframe 名称。
- animation-duration：规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function：规定动画的速度曲线。
- animation-delay：规定在动画开始之前的延迟。
- animation-iteration-count： 规定动画应该播放的次数。
- animation-direction：规定是否应该轮流反向播放动画。

注意：请始终规定 **animation-duration** 属性，否则时长为 0，就不会播放动画了。
*** 

## 10. display哪些取值 
**10.1. position：static**
默认值。没有定位，元素出现在正常流中。（忽略top、bottom、left、right或者z-index声明）



**10.2. position：fixed**
生成 ==绝对定位== 的元素，相对于 ==浏览器窗口== 进行定位。
元素的位置通过left, top, bottom, right进行规定。


**10.3. position：relative**
生成 ==相对定位== 的元素，相对于其 ==正常位置== 进行定位。
如：“left: 20px”会像元素的left位置添加20像素。


**10.4. position：absolute**
生成 ==绝对定位== 的元素，相对于 ==static以外的第一个父元素==  进行定位。
元素的位置通过left, top, bottom, right进行规定。

**10.5. position: flex**
任何一个容器都可以指定为 flex布局，包括行内元素。webkit内核的浏览器，必须加上 `-webkit `前缀。
***
## 11 相邻的inline-block节点出现空隙原因及解决办法
display-inline-block是让元素在一行显示，但是这些元素在html代码里面是上下行排列的，中间有换行符，于是并排显示就有了换行符带来的空隙。
解决办法如下：
```
a. 将html标签要display:inline-block 的元素写在一行。缺点：代码可读性差。

b. 给父元素设置font-size:0, 缺点是子元素如果里面有文字，文字会消失不见，所以又要给子元素设置
	font-size:0, 增加了代码量。
	
d. 给元素设置float:left, 缺点高度塌陷，要清楚浮动。

e. 设置子元素的margin-left为负值，但是元素之间的间隙大小是根据上下文的字体
	大小确定的，而每个浏览器的换行空隙大小不同，如果font-szie：16px, chrome空隙为8px, 
	火狐空隙为4px.所以这个方法不通用。
	
f. 设置父元素 display:table;word-spacing:-1em;目前这个方法可以完美解决，
	且兼容其他浏览器。
```
***
## 12. css实现三角形 
首先，建立一个空的div标签。
```
<div class="triangle"></div>
```
下面实现上下左右不同方向的三角形：

- 向上
```
.triangle{
	width:0;
    height:0;
	border-right:50px solid transparent;
	border-left:50px solid transparent;
	border-bottom:50px solid red;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803171035510.png)
- 向下
```
.triangle{
	width:0;
    height:0;
	border-right:50px solid transparent;
	border-left:50px solid transparent;
	border-top:50px solid red;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803171119902.png)
- 向左
```
.triangle{
	width:0;
    height:0;
	border-top:50px solid transparent;
	border-bottom:50px solid transparent;
	border-right:50px solid red;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803171215887.png)
- 向右
```
.triangle{
	width:0;
    height:0;
	border-top:50px solid transparent;
	border-bottom:50px solid transparent;
	border-left:50px solid red;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803171252746.png)
 


 

 	







【参考链接】

 - [https://www.cnblogs.com/huangzhilong/p/5007157.html](https://www.cnblogs.com/huangzhilong/p/5007157.html)
 - [http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
 - [https://www.w3school.com.cn/cssref/css_units.asp](https://www.w3school.com.cn/cssref/css_units.asp)
 - [https://segmentfault.com/a/1190000009916931](https://segmentfault.com/a/1190000009916931)
 - [https://blog.csdn.net/lxcao/article/details/52797914](https://blog.csdn.net/lxcao/article/details/52797914)
 - [https://blog.csdn.net/yangyixue123/article/details/79133748](https://blog.csdn.net/yangyixue123/article/details/79133748)
 - [https://www.cnblogs.com/5-clay/p/10496000.html](https://www.cnblogs.com/5-clay/p/10496000.html)
 - [https://blog.csdn.net/qq_34382449/article/details/81234653](https://blog.csdn.net/qq_34382449/article/details/81234653)

