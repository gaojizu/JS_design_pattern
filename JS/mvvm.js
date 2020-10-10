function ClearLove(options = {}) {
	this.$options = options //将所有属性挂载到options上
	var data = this._data = this.$options.data
	observe(data)
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true, //可枚举
			get() {
				return this._data[key]
			},
			set(newVal) {
				this._data[key] = newVal
			}
		})
	}
}

function Observe(data) {
	for (let key in data) {
		let val = data[key]
		observe(val) //递归 如果对象里面有对象的时候 就可以直接进行数据劫持了
		//将data属性通过object.defineproperty的方式进行定义属性
		Object.defineProperty(data, key, {
			enumerable: true, //可枚举
			get() {
				return val
			},
			set(newVal) {
				if (newVal === val) {
					return
				} else {
					val = newVal //如果再获取值的时候，将刚才设置的值丢回去
					observe(newVal)
				}
			}
		})
	}
}

function observe(data) {
	if(typeof data !== Object){
		return 
	}
	return new Observe(data)
}

//不能新增不存在的属性，因为不存在的属性的没有get和set方法，没有的话就没办法监控这个值
//深度响应 因为每次赋予一个新对象的时候，会给这个新对象增加一个definProperty
