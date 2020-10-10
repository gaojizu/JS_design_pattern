//vue实现一个mvvm是通过数据劫持+发布订阅模式
//之所以不兼容IE8以下原因是通过Object.definpropetry 也就是对象定义属性
//demo
let obj = {}
Object.defineProperty(obj, 'company', {
	value: 'tom'
})
console.info(obj)
