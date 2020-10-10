/**
 * @param {Object} _str string类型的数据转为array
 */
function stringToArray(_str) {
	return eval(_str)
}

let str =
	"[{'name':'tom','sex':'man'},{'name':'tom','sex':'man'},{'name':'tom','sex':'man'},{'name':'tom','sex':'man'}]"
console.info(stringToArray(str))