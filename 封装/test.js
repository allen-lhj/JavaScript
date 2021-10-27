function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrayType = '[object Array]';
    for (let i in origin) {
        if (origin.hasOwnProperty(i)) {
            if (typeof(origin[i]) === 'object' && origin[i] !== null) {
                toStr.call(origin[i]) === arrayType ? target[i] = [] : target[i] = {}
                deepClone(origin[i], target[i])
            } else {
                target[i] = origin[i]
            }
        }
    }
    return target
}

const a = [{name: '12', age: 23}, {name: '2', age: 22}]

const b = deepClone(a, [])

console.log(b)
console.log(Date.now())
