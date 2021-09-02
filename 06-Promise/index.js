const a = new Promise((resolve, reject) => {
    resolve(1)
})

console.log(Object.prototype.toString.call(a))
