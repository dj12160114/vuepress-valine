# Symbol

`Symbol()`函数会返回**symbol**类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："`new Symbol()`"。

每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

**symbol** 是一种基本数据类型。

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false

```



### Symbol 原型

所有 Symbol都继承于 Symbol.prototype。

**方法**：

+ `Symbol.prototype.toSource()`
  + 返回包含[`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 对象源码的字符串。覆盖`Object.prototype.toSource()`
+ `Symbol.prototype.toString()`
  + 返回包含Symbol描述符的字符串。 覆盖`Object.prototype.toString()`方法。
+ `Symbol.prototype.valueOf()`
  + 返回 `Symbol` 对象的初始值.。覆盖 `Object.prototype.valueOf()`方法。
+ `Symbol.prototype[@@toPrimitive\]`
  + 返回`Symbol`对象的初始值。

### Symbol 类型转换

+ 尝试将一个 symbol 值转换为一个 number 值时，会抛出一个 TypeError 错误。(e.g. `+sym` or `sym | 0`).
+ `Object(sym) == sym` 返回 true
+ 这会阻止你从一个 symbol 值隐式地创建一个新的 string 类型的属性名。例如，`Symbol("foo") + "bar"` 将抛出一个 `TypeError`(can't convert symbol to string).



**当使用 JSON.stringify() 时以 symbol 值作为键的属性会被完全忽略：**

```js
JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'
```





# DOM

**Core DOM 与 HTML DOM**

DOM既能解析XML文档，也能解析HTML文档。我们把 DOM Level1中能够解析XML文档的那部分叫做 Core DOM。而将在Core DOM 基础之上进行扩展的那部分叫做 HTML DOM。



## 1. DOM节点的访问

- `nodeValue`：文本节点值是它的实际文本，`document.nodeValue`为null
- `nodeType`：document（9），元素（1），属性（2），文本（3）
- `nodeName`：HTML标签返回的一般是具体标签名，文本节点名字是 **#text**

- `documentElement`：

  ```html
  document.documentElement; /* <html>...</html>*/
  document.documentElement.nodeType; /* 1 */
  document.documentElement.nodeName; /* HTML */
  ```

- `hasChildNodes()`：返回一个布尔值

- `childNodes`：一个类数组，具有 length 属性，可以通过下标访问子节点

- `parentNode`：访问自身的父节点

  ```html
  document.documentElement.parentNode; // #document
  ```

- `hasAttributes()`：返回一个布尔值表明当前元素节点是否有至少一个的属性

- `attributes`：返回该元素所有属性节点的一个实时集合，不是一个数组

  - 可以用下标访问，也可以用属性名的形式访问

  ```html
  attributes['id'];  
  ```

- `getAttribute()`：必须传入一个属性名作为参数

- `textContent`：获取标签中的文本内容，老式IE浏览器可以使用 `innerContent` 属性

- `innerHtml`：返回指定节点中的 html 代码，注意返回的知识字符串而已，而 document 对象返回的是可追踪的节点树。**注意它与上一个属性的不同**

  ```html
  bd.childNodes[3].innerHtml; /* <em>second</em> paragraph */
  bd.childNodes[3].textContent; /* second paragraph */
  ```

- `getElementsByTagName()/ getElementById()/ getElementsByName()`
- `getElementsByClassName()`
- `querySelector()`：通过 CSS选择器的方式查找元素，仅返回匹配的第一个元素
- `querySelectorAll()`：与前一个方法基本相同，但这个会返回匹配的所有元素

- `previousSibling / nextSibling`：访问前一/后一个兄弟节点
- `firstChild / lastChild`：访问第一个 / 最后一个子节点



## 2. 新建节点

- `createElement()`
- `createTextNode()`

**插入元素**

- `appendChild()`
- `insertBefore()`

**克隆元素**

- `cloneNode()`：有一个布尔类型的参数，true 表示深拷贝，包含所有子节点；false 表示浅拷贝，只针对当前节点



## 3. 删除节点

- `removeChild()`：如果还需要用到移除的节点，可以保存该方法的返回值，尽管该节点不在 DOM 树中，依然可以对其调用所有的 DOM方法
- `replaceChild()`：在移除一个节点的同时将一个节点放在该位置
  - 第一个参数：用来替换的新节点，如果该节点已经存在于 DOM树中，那么它会被从原始位置删除
  - 第二个参数：被替换掉的节点
  - 返回对被替换节点的引用

