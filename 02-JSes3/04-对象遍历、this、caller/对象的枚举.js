// function Car() {
//   this.brand = 'Benz';
//   this.color = 'red';
//   this.displacement = '3.0';
// }

// Car.prototype = {
//   lang: 5,
//   width: 2.5
// }

// Object.prototype.name = 'Object';

// var car = new Car();

// for(var key in car) {
//   if (car.hasOwnProperty(key)) {
//     console.log(car[key])
//   }
// }

var car = {
  brand: 'Benz',
  color: 'red',
  displacement: '3.0'
}
console.log('brand' in car)