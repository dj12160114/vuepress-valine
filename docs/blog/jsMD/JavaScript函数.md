# JavaScript函数

## 1.概述

### 1.1 函数的声明

JavaScript有三种声明函数的方法。

**(1) function 命令**

```js
function func(x) {
    console.log(x);
}
```

**(2) 函数表达式**

这种写法将一个匿名函数赋值给变量。这时，这个匿名函数也称函数表达式。

采用函数表达式声明函数时，function 命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，外部无效。

```js
var print = function x() {
    console.log(typeof x);
}

```

**(3) Function 构造函数**

```js
var add = new Function(
	'x',
    'y'
    'return x + y'
);
```

上述代码中，Function 构造函数接受三个参数，最后一个参数是 add 函数的“函数体”，其他都是其参数。

可以传递任意数量的参数给 Function 构造函数，只有最后一个参数被当作函数体，如果只有一个参数，该参数就是函数体。

### 1.2 函数的重复声明

如果一个函数被多次声明，后面的声明会覆盖前面的声明。

```js
function f() {
    console.log(1);
}
f(); // 2

function f() {
    console.log(2);
}
f(); // 2
```

由于函数名的提升，前一次声明在任何时候都是无效的。

### 1.3 return语句和递归

JavaScript 引擎遇到return语句，就直接返回 return 后面那个表达式的值，后面即使还有语句，也不会得到执行。return 语句不是必需的，如果没有的话，该函数不返回任何值，或者说返回 undefined。

函数可以调用自身，这就是递归。下面通过递归实现斐波拉契数列。

``` js
function fib(num) {
    if(num === 0) return 0;
    if(num === 1) return 1;
    return fib(num - 2) + fib(num - 1);
}
```

### 1.4 函数名的提升

JavaScript 引擎将函数名视同变量名，所以在采用 **fucntion** 命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。所以，下面的代码不会报错。

```js
f();
function f() {}
```

但是，如果采用 **函数表达式** 也就是赋值语句定义函数的话，就会报错。

```js
f();
var f = function() {}; 
// TypeError: undefined is not a function
```

上面的代码等同于下面的形式。

```js
var f;
f();
f = function() {};
```

上面第二行，调用 f 的时候，f 只是被声明了，还没被赋值，等于 undefined，所以报错。

如果同时采用 function 命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。

## 2. 函数的属性和方法

### 2.1 name 属性

函数的 **name** 属性返回函数的名字。

```js
function f1() {};
f1.name; // f1
```

如果是通过变量赋值定义的函数，那么 **name** 属性返回变量名。

```js
var f2 = function() {};
f2.name; // f2
```

但是上面的情况只有在变量的值是一个 **匿名函数** 时才如此。

如果变量的值是一个具名函数，那么 name 属性返回 function 关键字之后的那个函数名。

```js
var f3 = function myFunc() {};
f3.name; // myFunc
```

注意，真正函数名还是 **f3**，**myFunc** 这个名字只在函数体内部可用。

### 2.2 length 属性

函数的 **length** 属性返回函数**预期传入的参数个数**，即函数定义之中的参数个数，不同调用时究竟输入了多少参数，length 属性始终是定义时的参数个数。

```js
function f(a,b) {};
f.length; // 2
f(1,2,3,4);
f.length; // 2
```

### 2.3 toString() 方法

函数的 toString 方法返回一个字符串，内容是函数的源码。

```js
function f() {
  a();
  b();
  c();
}

f.toString()
// function f() {
//  a();
//  b();
//  c();
// }

```

对于那些原生的函数，toString 方法返回 `function funcName() {[native code]}`。

函数内部的注释也可以返回。

## 3. 函数作用域

### 3.1 定义

作用域 指的是变量寻存在的范围。在 ES5 中，JavaScript只有两种作用域：全局作用域，变量在整个是程序中一直存在，所有地方都可以读取；函数作用域，变量只在函数内部存在 。ES6新增了块级作用域。

函数内部定义的变量，会在该作用域内覆盖同名全局变量。

```js
var v = 1;
function f() {
    var v = 2;
    console.log(v);
}

f(); // 2
v; // 1
```

注意！对于 **var** 命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。

```js
var x = 4;
if(true) {
    var x = 5;
}
console.log(x); // 5
```

### 3.2 函数内部的变量提升

与全局作用域一样，函数作用域内部也会产生“变量提升”现象。**var** 声明的变量，不管在什么位置，变量声明都会提升到函数体头部。

```js
function foo(x) {
    if(x > 100) {
        var tmp = x - 100;
    }
} 

// 等同于
function foo(x) {
	var tmp;
    if(x > 100) {
        tmp = x - 100;
    }
} 
```

### 3.3 函数本身的作用域

函数的作用域和变量一样，就是其声明时所在的作用域，与其运行时的作用域无关。

```js
var a = 1;
var x = function() {
    console.log(a);
};

function f() {
    var a = 2;
    x();
}

f(); // 1
```

上面的代码中，函数 **x** 在函数 **f **的外部声明的，所以其作用域绑定外层，内部变量 a 不会到函数 **f** 体内取值，所以输出 1，不是 2.

总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

```js
var x = function () {
  console.log(a);
};

function y(func) {
  var a = 2;
  func();
}

y(x);
// ReferenceError: a is not defined
```

很容易犯错的一点是，如果函数`A`调用函数`B`，却没考虑到函数`B`不会引用函数`A`的内部变量。

这里 `x` 是传入的 `func` 函数，但 `x` 是在 `y` 外部定义的，属于外部作用域，访问不到 `y` 中的 `a` 变量，所以报错。

同样，函数体内部声明的函数，作用域绑定函数体内部。

```js
function foo() {
    var x = 1;
    function bar() {
        console.log(x);
    }
    return bar;
}

var x = 2;
var f = foo();
f(); // 1
```

## 4. 参数

### 4.1 参数的省略

函数运行时无论提供多少个参数（或者不提供参数），JavaScript都不会报错。省略的参数值就变为 undefined。

但没有办法只省略靠前的参数，而保留靠后的参数，如果一定要省略靠前的参数，只有显式传入 undefined.

```js
function f(a, b) {
    return a;
}
f(1,2,3); // 1
f(1); // 1
f(); // undefined

f( , 1); // SyntaxError: Unexpected token ,(…)
f(undefined, 1); // undefined 
```

### 4.2 传递方式

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是**传值传递**，在函数体内修改参数值不会影响函数外部。

```js
var p = 2;

function f(p) {
    p = 3; 
    return p;
}
console.log(f(p));  // 3 
console.log(p); // 2
```

上面代码中，函数内部 p 的值是原始值的拷贝，无论怎么修改都不会影响到原始值。

但如果函数参数是引用类型的值（数组、对象、其他函数），传递方式是传址传递。在函数内部修改参数，将会影响到原始值。

```js
var obj = { p: 1 };

function f(o) {
    o.p = 2;
    return o.p;
}
console.log(f(obj)); // 2

console.log(obj.p); // 2
```

**注意，如果函数内部修改的不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。**

```js
var obj = [1,2,3];

function f(o) {
    // 假如这里不是修改整个数组，而是修改其中一个元素如 o[2] = 4,
    // 那么最后输出的结果都将会是[1,2,4]。
    o= [2,3,4]; 
    return o;
}
console.log(f(obj)); // [2,3,4]

console.log(obj); // [1,2,3]
```

### 4.3 同名参数

如果有同名的参数，则会取最后出现的那个值。即使后面的 a 没有值或被省略，也是以其为准。

```js
function f(a, a) {
    console.log(a);
}
f(1,2); // 2
f(1); // undefined
```

### 4.4 arguments对象

**(1) 定义**

`arguments` 对象包含了函数运行时的所有参数，`arguments[0]` 就是第一个参数，以此类推。这个对象，只有在函数体内部才能使用。

正常模式下，`arguments` 对象可以在运行时修改。

```js
var f = function(a, b) {
    arguments[0] = 3;
    arguments[1] = 2;
    return a + b;
}

f(1, 1); // 5 
```

在严格模式下，`arguments` 对象与函数参数不具有联动关系。即修改 `arguments` 对象不会影响到实际函数参数。

```js
var f = function(a, b) {
    'use strict'; // 开启严格模式
    arguments[0] = 3;
    arguments[1] = 2;
    return a + b;
}

f(1, 1) // 2

```

通过 `arguments.length` 可以判断函数调用时到底带几个参数。

**(2) 与数组的关系**

`arguments` 虽然很像数组，但它是一个对象，数组专有方法不能在它身上直接使用。

如果要让 `arguments` 对象使用数组方法，真正的解决办法是将 `arguments` 转为真正的数组。下面是两种常用的转换方法：slice 方法和逐一填入新数组。

```js
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for(var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
}
```

**(3) callee 属性**

`arguments` 对象带有一个 `callee` 属性，返回它所对应的原函数。

```js
var f = function() {
    console.log(arguments.callee === f);
}
f(); // true
```

可以通过`arguments.callee`，达到调用函数自身的目的。这个属性在严格模式里面是禁用的，因此不建议使用。

## 5. 函数其他知识点 

### 5.1 闭包

[闭包就是能够读取其他函数内部变量的函数](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)。JavaScript中，函数内部可以读取全局变量，函数外部无法读取内部的局部变量。如果需要得到函数内部的变量，就只有通过在函数的内部，再定义一个函数。

```js
function f1() {
    var n = 999;
    function f2() {
        console.log(n); // 999
    }
}
```

函数`f2`就在函数`f1`内部，这时`f1`内部的所有局部变量，对`f2`都是可见的。但是反过来就不行，`f2`内部的局部变量，对`f1`就是不可见的。这就是 JavaScript 语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

闭包最大的作用，一是可以读取函数内部的变量，二是让这些变量始终保持在内存中，即闭包可以使得它的诞生环境一直存在。

```js
function increment(start) {
    return function() {
        return start++;
    }
}

var inc = increment(5);
console.log(inc());  // 5
console.log(inc());  // 6
console.log(inc());  // 7
```

上面代码中，strat 是 increment 的内部变量。变量 inc 始终在内存中，而 inc的存在依赖于 increment，因此也始终在内存中，不会在调用结束后被垃圾回收机制回收。

闭包的另一个用处，是封装对象的私有属性和私有方法。

```js
function Person(name) {
    var _age;
    function setAge(n) {
        _age = n;
    }
    function getAge() {
        return _age;
    }
    
    return {
        name: name,
        getAge: getAge,
    	setAge: setAge
    };
}

var p1 = Person('张三三');
p1.setAge(25);
p1.getAge(); // 25
```

函数`Person`的内部变量`_age`，通过闭包`getAge`和`setAge`，变成了返回对象`p1`的私有变量。

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。

### 5.2 立即调用的函数表达式

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

```js
function(){ /* code */ }();
// SyntaxError: Unexpected token (
```

产生这个错误的原因是，**function** 这个关键字可以当作语句，也可以当作表达式。

```js
// 语句
function f() {}

// 表达式
var f = function f() {};
```

JavaScript 引擎规定，如果`function`关键字出现在行首，一律解释成**语句**。因此，JavaScript 引擎看到行首是`function`关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决的办法是不要让 `function` 出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里。

```js
(function() { /* code */ }());
//或者
(function() { /* code */ })();
```

上面两种写法都是以圆括号开头，引擎就会认为后面跟的是一个表达式，而不是函数定义语句，就避免了错误。这就叫做“立即调用的函数表达式”（IIFE）.。

注意，上面两种写法，分号都是必须的。省略分号的话，遇到连着两个IIFE，JavaScript会将它们连在一起解释，把第二行解释为第一行的参数。

通常情况下，**只对匿名函数使用这种“立即执行的函数表达式”**。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

## 6. eval 命令

### 6.1 基本用法

`eval` 命令接受一个字符串作为参数，并将这个字符串当作语句执行。

```js
eval('var a = 1');
a; // 1
```

如果参数字符串无法当作语句执行，就会报错。

```js
eval('3x'); // SyntaxError: identifier starts immediately after numeric literal
```

放在`eval`中的字符串，应该有独自存在的意义，不能用来与`eval`以外的命令配合使用。下面的代码将会报错。

```js
eval('return;'); // Uncaught SyntaxError: Illegal return statement
```

如果`eval`的参数不是字符串，那么会原样返回。

```js
eval(123); // 123
```

`eval`没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

```js
var a = 1;
eval('a = 2');

a // 2
```

如果使用严格模式，`eval` 内部声明的变量，不会影响到外部作用域，但还是可以读写到当前作用域的变量。

```js
(function f() {
    'use strict';
    eval('var foo = 123');
    console.log(foo); // ReferenceError: foo is not defined
})();
```

`eval` 的本质是在当前作用域中，注入代码。由于安全风险和不利于JavaScript引擎优化速度，一般不推荐使用。

### 6.2 eval 的别名调用

下面这种情况，引擎在静态代码分析阶段，根本无法分辨执行的是 `eval`。

```js
var m = eval;
m('var x = 1');
x // 1
```

为了保证`eval`的别名不影响代码优化，JavaScript 的标准规定，凡是使用别名执行`eval`，`eval`内部一律是全局作用域。

```js
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e('console.log(a)');
}

f() // 1
```

上面代码中，`eval`是别名调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的`a`为全局变量。这样的话，引擎就能确认`e()`不会对当前的函数作用域产生影响，优化的时候就可以把这一行排除掉。

`eval`的别名调用的形式五花八门，只要不是直接调用，都属于别名调用，因为引擎只能分辨`eval()`这一种形式是直接调用。

```js
eval.call(null, '...')
window.eval('...')
(1, eval)('...')
(eval, eval)('...')
```

## 7. 参考链接

+ [https://wangdoc.com/javascript/types/function.html](https://wangdoc.com/javascript/types/function.html)

