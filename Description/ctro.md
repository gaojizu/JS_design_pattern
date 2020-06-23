### 写在前面
本篇文章的所有例子来源都是《JS设计模式与开发实践》这本书，写这篇文章之前也去查阅了很多关于this指向问题的探讨，包括但不仅仅有像阮一峰老师的
还有很多不知名的博主的帖子，还是决定写这篇文章有以下几个原因，第一，加深自己的理解，重新理一遍关于这方面的知识，第二，我尽可能的使用通俗简单的说辞进行解释
力求让更多的人明白这个东西，第三，this是js中的一个关键字，很有必要单独拿出来写一篇文章。最后一个原因是记录以下拜读这本书的过程！
### js中的this
#### this
> js中的this总是指向一个对象，也就是一个obj，但是具体指向的是哪一个obj是根据具体的运行时函数的执行环境动态绑定的，而不是函数被声明的环境！
看完这句话如果不是很明白的话没关系，因为这个毕竟只是一个解释，给出这句话的时候如果你们就明白了，下面我写的一切都没意义了，所以不明白是对的，明白了当然更好！
##### this的指向
如果不考虑常用的with和eval的情况下，具体到实际应用中，this的指向大致可以分为下面四类：
- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call 或者 Function.prototype.apply调用
下面我们一个一个说
###### 作为对象的方法调用
```js
var obj = {
        a : 1,
        getA:function () {
            console.info(this === obj) // true
            console.info(this.a)   // 1
        }
    }
    obj.getA()
```
###### 作为普通函数调用
> 当我们不把函数作为一个对象的属性被调用时，也就是我们常见的普通函数使用的时候，此时的this其实指向的是当前的全局对象，也就是windows，因为在js中全局对象就是windows
```js
    window.name = "globalName"
    var getName = function () {
        return this.name
    }
    console.info(getName()) //globalName
```
- 或者这样写

```js
    window.name = "globalName"
    var obj = {
        name: 'seven',
        getName: function () {
            return this.name
        }
    }
    var getName = obj.getName;
    console.info(getName()) //globalName
```
> 但是当我们使用一个函数调用的时候里面有一个局部的callback的方法，callback被当作普通函数被调用的时候，根据前面说的callback这个时候的this其实指向的是windows
例如：
```js
window.id = "windows"
    document.getElementById('div1').onclick = function () {
        console.info(this.id) //div1
        var callback = function () {
            console.info(this.id) //windows
        }
        callback()
    }
```
这个时候我们想callback里面的this指向不发生改变的话，就需要将this的值重新指向为当前
```js
window.id = "windows"
document.getElementById('div1').onclick = function () {
        console.info(this.id) //div1
        var that = this;
        var callback = function () {
            console.info(that.id) //div1
        }
        callback()
    }
```
> 其实这种写法如果你使用过一些框架或者是写过一些这种情况下的js代码的话，是很好理解的。
###### 作为构造器调用
> 构造器看起来是和函数一样的，他们的区别在于被调用的方式不一样，当使用new调用的时候他总会返回一个对象，那么一般情况下此时的this指向的就是该对象
```js
var myClass = function () {
        this.name = "seven"
    }
    var obj = new myClass()
    console.info(obj.name) //seven
```
> 那么如果我们按照下面的方式写的话，可能结果就不一样了
```js
var myClass = function () {
        this.name = "seven"
        return {
            name: "anna"
        }
    }
    var obj = new myClass()
    console.info(obj.name) //anna
```
> 解释一下为什么，因为此时构造器显式的返回了一个对象，那么他的返回值就会被这个新的对象给替换，因为this指向的是一个对象。也就是说他可以返回，如果不是一个对象的话，那么this的指向还是不会变
###### Function.prototype.call 或者 Function.prototype.apply调用
```js
var obj = {
        name : 'seven',
        getName : function () {
        return this.name
        }
    };
    var obj2 = {
        name : 'anna'
    };
    console.info(obj.getName()) //seven
    console.info(obj.getName.call(obj2)) //anna
```
> 具体为什么会这样，文章后面会写关于apply和call的使用
##### this丢失的情况
> 先看一段代码

```js
var obj = {
        myName : 'seven',
        getName : function () {
         return this.myName
        }
    };
    console.info(obj.getName()); //seven
    var getName2 = obj.getName;
    console.info(getName2()) //undefined
```
> 当第一次调用的时候，他是作为obj的属性被调用，那么此时的this指向的是这个对象，所以他是有myName的属性的，但是getName2是来自obj.getName
>此时是作为普通函数调用的，所以此时的this指向的是windows，但是我们windows并没有声明任何关于myName的值，所以是undefined


