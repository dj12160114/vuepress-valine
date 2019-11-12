# let 和 const

**块级作用域**

块级声明用于声明在指定块作用于之外无法访问的变量。块级作用域存在于：

+ 函数内部
+ 块中（字符 {} 之间的区域）

ES6使用 let 和 const 实现块级作用域。

### let声明

+ **声明不会被提升**

+ **禁止重声明**：同一作用域中已经存在某个标识符，此时再用 let 关键字声明它就会抛出错误。但如果当前作用域内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量。

  ```js
  var count = 30;
  let count = 40; // 抛出语法错误
  ```

  ``` js
  var count = 30;
  if(condition) {
      let count = 40; //不会抛出错误
  }
  ```



### const 声明

使用 const声明的是常量，其值一旦被设定后不可更改。因此，每个通过 const 声明的常量必须进行初始化，否则会抛出语法错误。

+ **声明时必须同时初始化**

+ **声明不会被提升到顶部**

+ **禁止重声明**

+ **const 声明对象，不允许修改绑定，但允许修改值**

  + 意味着const 声明对象后，可以修改该对象的属性值

  ```js
  const person = {
      name : 'Bob'
  };
  
  person.name = 'Amy'; // 可以修改对象属性的值
  
  // 抛出语法错误，因为这里再修改 person 绑定的对象
  person = {
      name: 'Amy'
  }
  ```



### 暂时性死区（Temporal Dead Zone）

与 var 不同，let 和 const 定义的变量不会被提升到作用域顶部。JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部（ var 声明），要么将声明放到 TDZ中（let 和 const）。访问 TDZ 中的变量会触发运行时错误。只有执行过变量赋值语句，变量才会从 TDZ中移出，方可正常访问。



### 循环中的 const 声明

普通 for 循环的话，由于更改 const 声明的值会抛出错误，所以执行 i++ 操作时会出现错误。

对于for-in或者 for-of循环，使用 const 与使用 let的行为一致。

### 

### 全局块作用域绑定

当 var 被用于 全局作用域时，它会创建一个新的全局变量作为全局对象的属性，这意味着 var 很可能无意中覆盖一个已经存在的全局属性。

但如果是使用 let 和 const ，会在全局作用域下创建一个绑定，但该绑定不会成为 全局对象的属性。let 和 const 不会覆盖全局变量，只会遮蔽它。

```js
let RegExp = 'hello';
console.log(RegExp); // hello
console.log(window.RegExp === RegExp); // false 
```







