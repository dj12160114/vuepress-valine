# 动态加载 js

+ **将 script 标签放到 body 底部：**

  + 常见的通过改变js加载方式来提升页面性能的一种方式
  + 一是不会造成页面解析的阻塞，就算加载时间过长用户也可以看到页面而不是一片空白；而且这时候可以在脚本中操作DOM

+ **defer 属性**：给 `<script>` 标签设置`defer`属性

  + 浏览器遇到带有`defer`属性的`<script>`标签时，会再开启一个线程去下载js文件
  + 同时继续解析HTML文档，等 HTML 全部解析完毕 DOM加载完成之后，再去执行加载好的js文件。

  + 只适用于引用外部js文件的`<script>`标签，可以保证多个js文件的执行顺序就是它们在页面中出现的顺序

+ **async属性**：
  + `async`属性和`defer`属性类似，也是会开启一个线程去下载js文件，但和`defer`不同的时，它会在下载完成后立刻执行，而不是会等到DOM加载完成之后再执行，所以还是有可能会造成阻塞。
  + `async`也是只适用于外部js文件，也不能在js中使用document.write方法
  + 但是对多个带有 `async` 的js文件，它不能像defer那样保证按顺序执行，**它是哪个js文件先下载完就先执行哪个**。
+ **动态创建 script 标签**

```JS
function loadJS( url, callback){
	var script = document.createElement('script');
	var fn = callback || function(){};
	script.type = 'text/javascript';
	//IE
	if(script.readyState){
		script.onreadystatechange = function(){
		  if( script.readyState == 'loaded' || script.readyState == 'complete' ){
		     script.onreadystatechange = null;
		     fn();
		   }
	    };
     } else{
	    //其他浏览器
	    script.onload = function(){
		     fn();
		};
	}
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
//用法
loadJS('file.js', function() {
	alert('callback')
});

```

