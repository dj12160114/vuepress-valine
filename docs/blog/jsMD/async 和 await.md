# async 和 await

任意一个名称都是有意义的，先从字面意思来理解。async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

## async的作用

async 作为一个关键字会被放到函数前面：

```
async function timeout(){
  return 'hello world'; 
}
```

只有一个作用，**它的调用会返回一个 Promise 对象**。怎么调用？async 函数也是函数，所以它的调用和普通的调用没什么区别，直接加括号调用就可以了。

```js
console.log(timeout());

/* 返回值，由此可以看出返回了一个 promise 对象
 Promise {<resolved>: "hello world"}
   __proto__: Promise
  [[PromiseStatus]]: "resolved"
  [[PromiseValue]]: "hello world"
*/
```

如果在函数中 return 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。

如果 async 函数没有返回值，那么就会返回 `Promise.resolve(undefined)`。

如果 async 函数内部抛出错误呢？就会调用 `Promise.reject()` 返回一个 Promise 对象

那么想要获取到 async 函数的执行结果，就要调用 Promise 的 then 或 catch 来给它注册回调函数。如果 async 函数执行完，返回的 Promise 没有注册回调函数，你会发现函数的调用就是执行了函数体，和普通函数没有区别。唯一的区别是函数执行完后还会返回一个 Promise 对象。

```js
async function timeout() {
    for (let index = 0; index < 3; index++) {
        console.log('async '+ index);
    }
 	return 'done';
}
console.log(timeout());
// 执行结果如下：
// async 0
// async 1
// async 2
// Promise {<resolved>: "done"}
```

总结一下，async 关键字的用法：

+ 最重要的是，async 函数的执行会把内部的返回值进行 Promise 封装，最终返回一个promise 对象
+ 如果这个函数通过 then 或 catch 注册了回调函数，async 函数执行完后，注册的回调函数就会放入异步队列中，等待执行

+ 联想一下 Promise 的特点——无等待，所以在没有 `await` 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象。并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致

## await 的作用

如果只是 async ，那么和 Promise 的作用就差不多，但有了 await 就变得不一样了，**await 只能出现在 async 函数中**，await 是等待的意思，那么它等待什么呢？它后面跟着什么呢？

其实它 **后面可以跟任何表达式**，不过我们更多的是放一个返回 Promise 对象的表达式。

```js
function getSomething() {
    return "something";
} // 普通函数

async function testAsync() {
    return "hello async";
}

async function test() {
    // await 后面也可以跟普通函数
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1);
    console.log(v2);
}

test();
// something
// hello async
// Promise {<resolved>: undefined}
```

它等待的是 async函数 Promise 对象的执行完毕，并返回结果。

await 等到了要等的东西，一个 Promise 对象或者其他值，然后呢？

await 是一个运算符，用于组成表达式，它的运算结果取决于它等的东西。如果它等的不是一个 Promise 对象，await 的运算结果就是它等到的东西；如果它等的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为其运算结果。

## async/await 用法模拟

举例，用 `setTimeout` 模拟耗时的异步操作

```js
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}
test();

// async函数相当于以下操作
takeLongTime().then(v => {
    console.log("got", v);
});
```

### async/await 的优势在于处理 then 链

单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了。

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 `setTimeout` 来模拟异步操作：

```js
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

Promise 实现三个步骤的处理：

```js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

async/ await 实现：

```js
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```



**参考链接**

+ https://segmentfault.com/a/1190000007535316?utm_source=tag-newest
+ https://www.cnblogs.com/SamWeb/p/8417940.html