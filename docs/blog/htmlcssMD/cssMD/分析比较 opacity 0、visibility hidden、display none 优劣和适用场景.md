# 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

### 1. display: none;

+ **DOM结构**：浏览器不会渲染 `display` 属性为 `none` 的元素，不占据空间；
+ **事件监听：** 无法进行 DOM 事件监听；
+ **性能：** 动态改变此属性会引起重排和重绘，性能较差；
+ **继承：** 不会被子元素继承，毕竟子类也不会被渲染，子元素是无法通过设置自身的display属性重新显示的；
+ **transition：** `transition` 不支持 `display`。

### 2. visibility：hidden；

- **DOM结构**：元素被隐藏，但是会被渲染不会消失，占据空间；
- **事件监听：** 无法进行 DOM 事件监听；
- **性能：** 动态改变此属性会引起重绘，性能较高；
- **继承：** 会被子元素继承，子元素可以通过设置 `visibility: visible;` 来取消隐藏；；
- **transition：** `transition` 支持 `visibility`。

```css
.box{
    background-color: lightblue;
    width: 100px;
    height: 100px;
    border: 1px solid;
    transition: all 0.5s ease-in;
    visibility: visible;
 }
.box:hover {
    visibility: hidden;
}
```

### 3. opacity：0

+ **DOM结构**：透明度为100%，元素被隐藏，占据空间；
+ **事件监听：** 可以进行 DOM 事件监听；
+ **性能：** 提升为合成层，不会触发重绘，性能较高；
+ **继承：** 会被子元素继承，且子元素不可以通过设置 `opacity: 1;` 来取消隐藏；；
+ **transition：** `transition` 支持 `opacity`。