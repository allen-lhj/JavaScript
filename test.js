const data = [
  {name: "危险区域", focus: 0, cautel: 1, fatigue: 10, silence: 90, attitude: 0, lucidity: 0, online:200},
  {name: "a区域", focus: 0, cautel: 1, fatigue: 90, silence: 100, attitude: 0, lucidity: 0, online:200}
]
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
// const arr = data.sort((a, b) => ((b.silence / b.online) - (a.silence / a.online)))
const arr = deepClone(data, []).sort((a, b) => ((b.silence / b.online) - (a.silence / a.online)))
// const arr2 = deepClone(data, []).sort((a, b) => ((b.fatigue / b.fatigue) - (a.fatigue / a.fatigue)))
console.log(data === arr)