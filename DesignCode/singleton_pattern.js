/**
 * @description JS单例模式
 * @author clearlove
 * @date 07/08
 */
// 定义：单例模式保证一个类仅有一个实例，并提供一个访问他的全局访问点
// 实现一个简单的单例模式,过程描述，实现一个简单的单例模式的话，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。
var Singleton = function(name) {
	this.name = name
}
Singleton.instance = null
Singleton.prototype.getName = function() {
	console.info(this.name)
}

Singleton.getInstance = function(name) {
	console.info(this.instance)
	if (!this.instance) {
		this.instance = new Singleton(name)
	}
	return this.instance
}
var a = Singleton.getInstance('sven1')
var b = Singleton.getInstance('sven2')
console.info(a === b)   //true

//或者
var Singleton = function(name){
	this.name = name
}
Singleton.prototype.getName = function(){
	console.info(this.name)
}
Singleton.getInstance = (function(){
	var instance = null
	return function(name){
		if(!instance){
			instance = new Singleton(name)
		}
		return instance
	}
})()
