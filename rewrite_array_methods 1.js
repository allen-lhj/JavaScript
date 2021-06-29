/*
 * @Autor: lhj
 * @Date: 2021-06-29 10:31:24
 * @LastEditTime: 2021-06-29 10:31:26
 */
/**
 * 会改变原数组的9种方法有:
 *   1. push
 *   2. pop
 *   3. unshift
 *   4. shift
 *   5. reserve
 *   6. splice 
 *   7. fill 
 *   8. sort 
 *   9. copyWithin（不会改变原数组长度）
 * 属于高阶函数的有（接受一个函数作为参数)：
 *   1.  forEach 
 *   2.  map 
 *   3.  find 
 *   4.  findIndex
 *   5.  some 
 *   6.  every 
 *   7.  filter 
 *   8.  reduce 
 *   9.  flatMap
 *   10. sort 
 *   11. reduceRight
 * 不会为遍历那些被删除或从未被赋值的（稀松数组中的empty）索引的方法有：
 *   1. forEach
 *   2. map
 *   3. some
 *   4. every
 *   5. filter
 *   6. reduce
 *   7. reduceRight
 *   8. flatMap
 *   9. sort
 *  10. indexOf 
 *  11. lastIndexOf
 *  12. flat
 * 返回数组的方法：
 *   1. map 
 *   2. splice (包含的是被删除的元素)
 *   3. reverse (返回本身)
 *   4. filter 
 *   5. slice 
 *   6. flatMap 
 *   7. cooncat 
 *   8. sort (返回本身)
 *   9. fill (返回本身)
 *  10. copyWithin (返回本身)
 *  11. unique （跟new Set([...])去重效果相同）
 * 用于查询数组的方法：
 *   1. find 
 *   2. findIndex 
 *   3. some 
 *   4. every 
 *   5. indexOf 
 *   6. lastIndexOf 
 *   7. includes （采用同值零等式对比）
 *   8. filter
 * 返回迭代器的方法：
 *   1. keys
 *   2. values
 *   3. entries
 */




;(function(){
  var _hasOwn   = Object.prototype.hasOwnProperty;
  var _toString = Object.prototype.toString;

  /**
   * @description 同值零等式，具体规则参考MDN文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
   * @param {any} x
   * @param {any} y
   * @returns {Boolean} 相等返回true，否则返回false
   */
  function sameValueZero(x, y) {
    if (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y)) {
      return true;
    }

    return x === y;
  }

  /**
   * @description 获取数组中的所有的非empty索引或者已被删除的索引
   * @param {Array} arr 
   * @returns {Array} 返回所有数组中的非empty项和非已被删除项的索引组成的数组
   */
  function getNotEmptyIndexsOfArray(arr){
    var res = [];

    for(var key in arr){
      if(_hasOwn.call(arr, key)){
        res.push(+key);
      }
    }

    return res;
  }

  /**
   * @description 判断数组的某个索引是未被赋值或者是已经被删除的
   * @param {Array} arr 
   * @param {Number} index 
   * @returns {Boolean} 已被删除的索引或者未被赋值（empty项）返回 true，否则返回 false
   */
  function isEmptyElOfArray(arr, index){
    return !_hasOwn.call(arr, index);
  }

  /**
   * @description 是否是一个可迭代的对象
   * @param {any} obj 
   * @returns {Boolean} 是返回true，不是返回falae
   */
  function isIterable(obj){
    return obj !== undefined && obj !== null && !!obj[Symbol.iterator];
  }


  // ======================================================================================================= //
  // ====================================== 数组等等一些静态方法 ==============================================  //
  // ======================================================================================================= //


  /**
   * @description 确定传递的值是否是一个 Array。
   * @param {any} obj
   *   需要检测的值。
   * @returns {Boolean} 如果值是 Array，则为true; 否则为false。
   */
  Array._isArray = function(obj) {
    return _toString.call(obj) === "[object Array]";
  };

  /**
   * @description 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
   * @param  elementN
   *   任意个参数，将按顺序成为返回数组中的元素。
   * @returns {Array} 创建的新的 Array 实例。
   * @notice  Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素
   *          7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，
   *          而不是由7个undefined组成的数组）。
   */
  Array._of = function(){
    var arr = [];
    for(var i = 0, l = arguments.length; i < l; i++){
      arr._push(arguments[i]);
    }

    return arr;
  }

  /**
   * @description 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
   * @param {any} arrayLike 
   *   想要转换成数组的伪数组对象或可迭代对象。
   * @param {Function} mapFn [可选]
   *   如果指定了该参数，新数组中的每个元素会执行该回调函数。
   * @param {any} thisArg [可选]
   *   可选参数，执行回调函数 mapFn 时 this 对象。
   * @returns {Array} 一个新的数组实例。
   */
  Array._from = function(arrayLike, mapFn, thisArg){
    var arr = [];

    if(arrayLike === void(0) || arrayLike === null){
      throw TypeError(arrayLike+ " is not iterable (cannot read property Symbol(Symbol.iterator))")
    }

    if(isIterable(arrayLike)){
      var i = 0;
      for (const iterator of arrayLike) {
        arr._push(mapFn ? mapFn.call(thisArg, iterator, i) : iterator);
        i++;
      }
    }else if(typeof arrayLike === 'object' && arrayLike.length > 0){
      var item;
      for(var i = 0, l = arrayLike.length; i < l; i++){
        item = arrayLike[i];
        arr._push(mapFn ? mapFn.call(thisArg, item, i) : item);
      }
    }

    return arr;
  }


  // ======================================================================================================= //
  // ====================================== Array.prototype ================================================  //
  // ======================================================================================================= //


  // ======================================会改变原数组的9种方法============================================== //

  /**
   * @description 向数组末尾追加元素 [此方法会改变原数组]
   * @returns {Number} 返回执行了方法以后该数组的长度
   */
  Array.prototype._push = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      this[this.length] = arguments[i];
      // 处理类数组
      if (!Array._isArray(this)) {
        this.length++;
      }
    }

    return this.length;
  };

  /**
   * @description 弹出数组末端元素 [此方法会改变原数组]
   * @returns {any} 返回弹出的元素本身
   */
  Array.prototype._pop = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var lastItem = this[this.length - 1];
    this.length -= 1;
    return lastItem;
  };

  /**
   * @description 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。[此方法会改变原数组]
   * @param {number} start 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；
   *                       如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于
   *                       array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
   * @param {number} deleteCount 整数，表示要移除的数组元素的个数。
                                 如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
                                如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，
                                如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
                                如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素
  * @returns 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
  */
  Array.prototype._splice = function(start, deleteCount) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var argLen = arguments.length,
      length = this.length,
      res = [];

    if (argLen === 0) {
      return res;
    }

    start += start >= 0 ? 0 : length;
    if (start < 0) {
      start = 0;
    }

    if (deleteCount !== undefined) {
      deleteCount = Number(deleteCount);
      deleteCount = isNaN(deleteCount) ? 0 : deleteCount;
    }

    var leftArr = [],
      rightArr = [],
      addArr = [];

    if (argLen === 1) {
      for (var i = start; i < length; i++) {
        // 如果是empty项 则直接将res.length++ 在res里新增一个empty项
        if(isEmptyElOfArray(this, i)){
          res.length++;
          continue;
        }else {
          res._push(this[i]);
        }
      }
      this.length = start;
    } else if (argLen > 1) {
      for (var i = 2; i < argLen; i++) {
        addArr._push(arguments[i]);
      }

      if (deleteCount > 0) {
        var completeDeleteCount = 0;

        for (var i = 0; i < length; i++) {
          var item = this[i];
          if (i >= start && completeDeleteCount < deleteCount) {
            isEmptyElOfArray(this, i) ? res.length++ : res._push(item);
            ++completeDeleteCount;
          } else if (i < start) {
            isEmptyElOfArray(this, i) ? leftArr.length++ : leftArr._push(item);
          } else if (i >= start && completeDeleteCount >= deleteCount) {
            isEmptyElOfArray(this, i) ? rightArr.length++ :  rightArr._push(item);
          }
        }
      }

      if (leftArr.length || rightArr.length || addArr.length) {
        this.length = 0;
        for (var i = 0, l = leftArr.length; i < l; i++) {
          isEmptyElOfArray(leftArr, i) ? this.length++ : this._push(leftArr[i]);
        }
        for (var i = 0, l = addArr.length; i < l; i++) {
          isEmptyElOfArray(addArr, i) ? this.length++ : this._push(addArr[i]);
        }
        for (var i = 0, l = rightArr.length; i < l; i++) {
          isEmptyElOfArray(rightArr, i) ? this.length++ : this._push(rightArr[i]);
        }
      }
    }

    return res;
  };

  /**
   * 从数组中删除第一个元素，并返回该元素的值。 [此方法会改变原数组]
   * @returns 返回被删除的元素
   */
  Array.prototype._shitf = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var item = this[0];
    this._splice(0, 1);

    return item;
  };

  /**
   * 将一个或多个元素添加到数组的开头，并返回该数组的新长度。 [此方法会改变原数组]
   * @returns {Number} 返回执行了方法以后该数组的长度
   */
  Array.prototype._unshift = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var args = [0, 0];

    for (var i = 0, l = arguments.length; i < l; i++) {
      args._push(arguments[i]);
    }

    this._splice.apply(this, args);

    return this.length;
  };

  /**
   * @description 将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。[此方法会改变原数组]
   * @returns {Array} 返回执行了方法以后该数组本身
   */
  Array.prototype._reverse = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var oArr = this._slice();
    // 清空本数组
    this.length = 0;

    for(var i = oArr.length - 1; i >= 0; i--){
      // 处理empty项
      isEmptyElOfArray(oArr, i) ? this.length++ : this._push(oArr[i]);
    }

    return this;
  };

  /**
   * @description 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。闭开区间 [start,end) [此方法会改变原数组]
   * @param {any} value
   *   用来填充数组元素的值。
   * @param {Number} start
   *   起始索引，默认值为0。
   *   如果 start 实参是一个非number类型，则会将它转成number类型，如果转成number之后为NaN，则赋值为0。
   *   如果 start 实参是一个undefined，则将它赋值为0。
   *   如果 start 是个负数, 则开始索引会被自动计算成为 length+start。 其中 length 是 this 对象
   * @param {Number} end
   *   终止索引，默认值为 this.length。
   *   如果 end 是个负数, 则结束索引会被自动计算成为 length+end。
   * @returns {Array} 修改后的数组。
   */
  Array.prototype._fill = function(value, start, end) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var length = this.length;

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = length;
    }

    start = Number(start);
    start = isNaN(start) ? 0 : start;
    end = Number(end);
    end = isNaN(end) ? 0 : end;
    start += start >= 0 ? 0 : length;
    end += end >= 0 ? 0 : length;

    for (var i = start; i < end; i++) {
      this[i] = value;
    }

    return this;
  };

  /**
   * @description 用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
   * @param {Function} compareFunction
   *   compareFunction 可选
   *     用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
   *     firstEl
   *       第一个用于比较的元素。
   *     secondEl
   *       第二个用于比较的元素。
   *     如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana"
   *   会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），
   *   比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
   *     如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
   *     如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前； => a b
   *     如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，=> b a
   *   而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
   *     如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。 // b a
   *   compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
   * @returns {Array} 排序后的数组。请注意，数组已原地排序，并且不进行复制。
   * @notice 技术实现上采用了原地算法（不同浏览器下的具体实现不太一样）
   *  V8          arr.length <= 10 采用插入排序
   *              arr.length > 10  采用快速排序
   *  Mozilla     归并排序
   *  Webkit      C++标准库里面的qSort 快速排序的理念
   *
   *  此版实现采用的是V8引擎的实现方式
   */
  Array.prototype._sort = function(compareFunction) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length;

    if (length <= 1) {
      return this;
    }

    // 处理undefined 和 empty项
    var exclude = [],
        emptyCount = 0,
        item;
    for (i = length - 1; i >= 0; i--) {
      if(isEmptyElOfArray(this, i)){
        // 走到这里就是empty项了
        emptyCount++;
        this._splice(i, 1);
      }else{
        item = this[i];
        if (item === void(0)) {
          exclude._push(item);
          this._splice(i, 1);
        }
      } 
    }

    if(length <= 10){
      // length <= 10 采用插入排序
      var a, b, currentIndex, result;
      for(var i = 1; i < length; i++){
          a = this[i];
          currentIndex = i;
          for(var j = i - 1; j >= 0; j--){
              // 已经排好序的部分 b a
              b = this[j];
              if (a === void 0 || b === void 0) {
                continue;
              }
              if (typeof compareFunction === "function") {
                result = compareFunction(a, b);
                if (result < 0) {
                  swap(this, currentIndex, j);
                  currentIndex = j;
                }
              }else if((b + '') > (a +'')){
                  swap(this, currentIndex, j);
                  currentIndex = j;
              }                    
          }
      }
    }else{
      // length > 10 采用快速排序
      quickSort(this);
    }

    // 添加undefined
    this._push.apply(this, exclude);
    // 追加empty项和已被删除项
    this.length += emptyCount;

    return this;

    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function quickSort(arr,left,right){
      var length = arr.length,
          middleIndex,
          left = typeof left != 'number' ? 0 : left,
          right = typeof right != 'number' ? length - 1 : right;

      if (left < right) {
          middleIndex = getMiddleIndex(arr, left, right);
          quickSort(arr, left, middleIndex - 1);
          quickSort(arr, middleIndex + 1, right);
      }

      return arr;
      
      function getMiddleIndex(arr,left,right){
          var middleIndex = left,
              index = middleIndex + 1,
              a, b;
          for(var i = index; i <= right; i++){
            a = arr[i];
            b = arr[middleIndex];

            if (a === void 0 || b === void 0) {
              continue;
            }
            if (typeof compareFunction === "function") {
              result = compareFunction(a, b);
              if (result < 0) {
                swap(arr, i, index);
                index++;
              }
            }else if((b + '') > (a +'')){
              swap(arr, i, index);
              index++;
            }              
          }
          swap(arr,middleIndex, index-1);
          return index - 1;
      }
    }
  };

  /**
   * @description 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
   * @param {Number} target 
   *   0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
   *   如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
   * @param {Number} satrt 
   *   0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
   *   如果 start 被忽略，copyWithin 将会从0开始复制。
   * @param {Number} end 
   *   0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
   *   如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）
   * @returns {Array} 返回执行该方法改变后的数组。
   */
  Array.prototype._copyWithin = function(target, start = 0, end){
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length;
    if(length <= 1 || target >= length){
      return this;
    }

    target = Number(target);
    target = isNaN(target)? 0 : parseInt(target);
    start = Number(start);
    start = isNaN(start)? 0 : parseInt(start);
    start += start >= 0? 0 : length;
    end = Number(end);
    end = isNaN(end)? length : parseInt(end);
    end += end >= 0? 0 : length;

    var copyArea = this._slice(start,end);
    var i = copyArea.length,
        j = 0;

    while(i-- && target < length){
      this[target++] = copyArea[j++];
    }
    
    return this;
  }

  // ====================================== 不会会改变原数组的方法 ============================================== //

  /**
   * @description 对数组的每个元素执行一次给定的函数。
   * @param {Function} callback
   * @param {any} thisArg
   * @returns {undefined}
   * @notice 1. callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。
   */
  Array.prototype._forEach = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 获取所有非empty项的索引
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        index;
    for(var i = 0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      callback.call(thisArg, this[index], index, this);
    }
  };

  /**
   * @description 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
   * @param {Function} callback
   * @param {any} thisArg
   * @returns {Array} 一个由原数组每个元素执行回调函数的结果组成的新数组。
   * @notice 1. callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。
   */
  Array.prototype._map = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var res = [],
        notEmptyIndexs = getNotEmptyIndexsOfArray(this), // 获取所有非empty项的索引
        index;

    for(var i = 0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      res._push(callback.call(thisArg, this[index], index, this));
    }

    return res;
  };

  /**
   * @description 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
   * @param {Number} begin
   *  提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。
   *  如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
   *  如果省略 begin，则 slice 从索引 0 开始。
   *  如果 begin 超出原数组的索引范围，则会返回空数组。
   * @param {Number} end
   *  提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
   *  slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
   *  如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
   *  如果 end 被省略，则 slice 会一直提取到原数组末尾。
   *  如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
   * @returns {Array} 一个含有被提取元素的新数组。
   */
  Array.prototype._slice = function(begin, end) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length,
      res = [];

    if (!length) {
      return res;
    }
    
    // 处理begin
    begin = Number(begin);
    begin = isNaN(begin) ? 0 : begin;
    begin += begin >= 0 ? 0 : length;
    if (begin < 0) {
      begin = 0;
    }

    // 处理end
    if (end === undefined) {
      end = length;
    }
    end = Number(end);
    end = isNaN(end) ? 0 : end;
    end += end >= 0 ? 0 : length;
    if (end < 0) {
      end = 0;
    }

    if (begin < end) {
      // 开始浅拷贝
      for (var i = begin; i < end && i < length; i++) {
        isEmptyElOfArray(this, i) ? res.length++ : res._push(this[i]);
      }
    }

    return res;
  };

  /**
   * @description 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
   *              如果数组只有一个项目，那么将返回该项目而不使用分隔符。
   * @param {String} separator [可选]
   *   指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号（,）分隔。
   *   如果separator是空字符串("")，则所有元素之间都没有任何字符。
   * @returns {String} 一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串。
   * @notice 如果一个元素为 undefined 或 null，它会被转换为空字符串。
   */
  Array.prototype._join = function(separator = ",") {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var res = "",
      item;
    for (var i = 0, l = this.length; i < l; i++) {
      item = this[i];

      res += item === undefined || item === null ? "" : item;
      if (i !== l - 1) {
        res += separator;
      }
    }

    return res;
  };

  /**
   * @description 采用整数值并返回该索引处的项目，允许正整数和负整数。负整数从数组中的最后一项开始计数。
   * @param {Number} index
   *  要返回的数组元素的索引（位置）。当传递一个负索引时，支持从数组末尾开始相对索引；
   *  即，如果使用负数，将通过从数组末尾开始倒数来找到返回的元素。
   * @returns {any} 数组中与给定索引匹配的元素。undefined如果找不到给定的索引，则返回。
   */
  Array.prototype._at = function(index) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    index = Number(index);
    index += index >= 0 ? 0 : this.length;

    return this[index];
  };

  /**
   * @description 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
   * @param valueN [可选]
   *    要连接到新数组中的数组和/或值。如果省略所有 参数，则返回调用它的现有数组的浅表副本。
   * @returns {Array} 一个新Array实例。
   */
  Array.prototype._concat = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var res = this._slice(),
      item;

    for (var i = 0, l = arguments.length; i < l; i++) {
      item = arguments[i];
      if (Array._isArray(item)) {
        for(var j = 0, k = item.length; j < k; j++){
          // 处理empty项
          isEmptyElOfArray(item, j) ? res.length++ : res._push(item[j]);
        }
      } else {
        res._push(item);
      }
    }

    return res;
  };

  /**
   * @description 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
   * @param {Number} depth [可选]
   *   指定要提取嵌套数组的结构深度，默认值为 1。
   *   如果depth不是一个Number类型，那么将会试图将它转成一个Number类型。
   *   如果转换后的depth的值为NaN那么depth将会被赋值成 0。
   *   如果depth的值为 Infinity，可展开任意深度的嵌套数组。
   * @returns {Array} 一个包含将数组与子数组中所有元素的新数组。
   */
  Array.prototype._flat = function(depth = 1) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    if (typeof depth !== "number") {
      depth = Number(depth);
      depth = isNaN(depth) ? 0 : depth;
      if (!depth) {
        return this._slice();
      }
    }

    var currentDepth = depth,
      res = [],
      item;

    for (var i = 0, l = this.length; i < l; i++) {
      if(isEmptyElOfArray(this, i)){
        // 不遍历empty项
        continue;
      }
      item = this[i];
      if (Array.isArray(item) && currentDepth-- > 0) {
        res = res._concat(item._flat(currentDepth));
      } else {
        res._push(item);
      }
    }

    return res;
  };

  /**
   * @description 首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值
   *              为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
   * @param {Function} callback
   *   可以生成一个新数组中的元素的函数，可以传入三个参数：
   *     currentValue
   *       当前正在数组中处理的元素
   *     index [可选]
   *       可选的。数组中正在处理的当前元素的索引。
   *     array [可选]
   *       可选的。被调用的 map 数组
   * @param {any} thisArg 默认为undefined [可选]
   *   可选的。执行 callback 函数时 使用的this 值。
   * @returns {Array}  一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
   * @notice 1. callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
   */
  Array.prototype._flatMap = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var res = [],
        notEmptyIndexs = getNotEmptyIndexsOfArray(this), // 获取所有非empty项和已被删除项的索引
        callbackResult,
        index;

    // 如果是未被赋值（empty项）索引 或者 已被删除的索引，则不调用callback函数
    for(var i =0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      callbackResult = callback.call(thisArg, this[index], index, this);
      if (Array._isArray(callbackResult)) {
        res = res._concat(callbackResult);
      } else {
        res._push(callbackResult);
      }
    }

    return res;
  };

  /**
   * @description 返回可以在数组中找到给定元素的第一个索引，如果不存在，则返回 -1。
   * @param {any} searchElement 要在数组中定位的元素。
   * @param {Number} fromIndex [可选]
   *  开始搜索的索引。如果索引大于或等于数组的长度，则返回-1，这意味着不会搜索数组。如果提供的索引值为负数，
   *  则将其视为距数组末尾的偏移量。注意：如果提供的索引为负数，数组仍然是从前到后搜索。如果提供的索引为 0，
   *  则将搜索整个数组。默认值：0（搜索整个数组）。
   * @returns {Number} 数组中元素的第一个索引；-1如果没有找到。
   */
  Array.prototype._indexOf = function(searchElement, fromIndex = 0) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length,
      notFoundCode = -1;

    if (!length) {
      return notFoundCode;
    }
    if (fromIndex >= length) {
      return notFoundCode;
    }

    for(var i = fromIndex; i < length; i++){
      if(isEmptyElOfArray(this, i)){
        // 遇到empty项直接continue;
        continue;
      }
      if(searchElement === this[i]){
        return i;
      }
    }

    return notFoundCode;
  };

  /**
   * @description 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。
   *              从数组的后面向前查找，从 fromIndex 处开始。
   * @param {any} searchElement
   *   被查找的元素。
   * @param {Number} fromIndex
   *   从此位置开始逆向查找。默认为数组的长度减 1(arr.length - 1)，即整个数组都被查找。如果该值大于或等于数组的长度，
   *   则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，
   *   其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
   * @returns {Number} 数组中该元素最后一次出现的索引，如未找到返回-1。
   */
  Array.prototype._lastIndexOf = function(searchElement, fromIndex) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length,
      notFoundCode = -1;

    if (!length) {
      return notFoundCode;
    }

    if (fromIndex === void (0)) {
      fromIndex = length - 1;
    }

    if (fromIndex < 0) {
      if (Math.abs(fromIndex) > length) {
        return notFoundCode;
      }

      fromIndex += fromIndex >= 0 ? 0 : length;
      if(fromIndex < 0){
        fromIndex = 0;
      }
    }

    for (var i = fromIndex; i >= 0; i--) {
      if(isEmptyElOfArray(this, i)){
        // 遇到empty项直接continue;
        continue;
      }
      if (this[i] === searchElement) {
        return i;
      }
    }

    return notFoundCode;
  };

  /**
   * @description 返回提供的数组中满足提供的测试函数的第一个元素的值。如果没有值满足测试函数，undefined则返回。
   *   find方法对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。
   *   当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。注意 callback 
   *   函数会为数组中的每个索引调用即从 0 到 length - 1，而 "不仅仅是那些被赋值的索引" ，这意味着对于 "稀疏数组" 来说，
   *   该方法的 "效率要低于" 那些只遍历有值的索引的方法。
   * @param {Function} callback
   *  callbackFn
   *     对数组中的每个值执行的函数，采用 3 个参数：
   *     element
   *       数组中的当前元素。
   *     index 可选的
   *       数组中当前元素的索引（位置）。
   *     array 可选的
   *       find被调用的数组。
   * @param {any} thisArg [可选的]
   *     用作thisinside 的 对象callbackFn。
   * @returns {any} 数组中满足提供的测试函数的第一个元素的值。否则，被退回。 undefined
   */
  Array.prototype._find = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 稀松数组中的empty也会被遍历
    var item;
    for (var i = 0, l = this.length; i < l; i++) {
      item = this[i];
      if (!!callback.call(thisArg, item, i, this)) {
        return item;
      }
    }
  };

  /**
   * @description 返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
   * @param {Function} callback
   *   针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
   *     element
   *       当前元素。
   *     index
   *       当前元素的索引。
   *     array
   *       调用findIndex的数组。
   * @param {any} thisArg 默认为undefined [可选]
   *   执行callback时作为this对象的值.
   * @returns {Number} 数组中通过提供测试函数的第一个元素的索引。否则，返回-1
   * @notice 在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被
   *         callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback
   *         函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍然会被访问到。
   */
  Array.prototype._findIndex = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    /**
     * 1. 在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被
     * callback函数访问到。
     * 2. 根据对稀松数组调用标准库的findIndex发现会遍历稀松数组中的empty项
     */
    var item;
    for (var i = 0, l = this.length; i < l; i++) {
      item = this[i];
      // 将callback的返回值强制转成布尔值
      if (!!callback.call(thisArg, item, i, this)) {
        return i;
      }
    }

    return -1;
  };

  /**
   * @description 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
   * @param {any} valueToFind
   *   需要查找的元素值。
   * @param {Number} fromIndex
   *   从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex
   *   的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
   * @returns {Boolean} 返回一个布尔值 Boolean ，如果在数组中找到了（如果传入了 fromIndex ，
   *                    表示在 fromIndex 指定的索引范围中找到了）则返回 true 。
   * @notice 从技术上讲，includes()使用sameValueZero算法来确定是否找到给定元素。
   *         [, 1, 2, , 3, 4].includes(undefined); // true
   *         从在稀松数组上调用原生includes上的结果来看，原生的includes会遍历empty项
   */
  Array.prototype._includes = function(valueToFind, fromIndex = 0) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length;

    fromIndex = Number(fromIndex);
    fromIndex = isNaN(fromIndex) ? 0 : fromIndex;
    fromIndex += fromIndex >= 0 ? 0 : length;

    // 会遍历empty项
    var item;
    for (var i = fromIndex; i < length; i++) {
      item = this[i];
      if (sameValueZero(valueToFind, item)) {
        return true;
      }
    }

    return false;
  };

  /**
   * @description 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
   * @param {Function} callback
   *   callback
   *     用来测试每个元素的函数，接受三个参数：
   *     element
   *       数组中正在处理的元素。
   *     index [可选]
   *       数组中正在处理的元素的索引值。
   *     array [可选]
   *       some()被调用的数组。
   * @param {any} thisArg
   *   thisArg 默认为undefined [可选]
   *     执行 callback 时使用的 this 值。
   * @returns {Boolean} 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。
   * @notice 1. 如果用一个空数组进行测试，在任何情况下它返回的都是false。
   *         2. callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
   */
  Array.prototype._some = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var length = this.length;
    if (!length) {
      // 数组为空，如果用一个空数组进行测试，在任何情况下它返回的都是false。
      return false;
    }

    // 获取所有非empty项的索引： some不会遍历那些在稀松数组中为empty的项
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        index;
    for(var i = 0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      // 将callback的返回值强制转成布尔值
      if (!!callback.call(thisArg, this[index], index, this)) {
        return true;
      }
    }

    return false;
  };

  /**
   * @description 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
   * @param {Function} callback
   *  用来测试每个元素的函数，它可以接收三个参数：
   *    element
   *      用于测试的当前值。
   *    index [可选]
   *      用于测试的当前值的索引。
   *    array [可选]
   *      调用 every 的当前数组。
   * @param {any} thisArg 默认为undefined  [可选]
   *    执行 callback 时使用的 this 值。
   * @returns {Boolean} 如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
   * @notice 1. 若收到一个空数组，此方法在一切情况下都会返回 true。
   *         2. 遇到empty项不会调用callback函数，而是直接跳过
   */
  Array.prototype._every = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var length = this.length;
    if (!length) {
      return false;
    }

    // 获取所有非empty项的索引： some不会遍历那些在稀松数组中为empty的项
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        index;
    for(var i = 0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      // 将callback的返回值强制转成布尔值
      if ((!!callback.call(thisArg, this[index], index, this)) === false) {
        return false;
      }
    }

    return true;
  };

  /**
   * @description 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
   * @param {Function} callback
   *   callback
   *     用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
   *     element
   *       数组中当前正在处理的元素。
   *     index [可选]
   *       正在处理的元素在数组中的索引。
   *     array [可选]
   *       调用了 filter 的数组本身。
   * @param {any} thisArg 默认为undefined [可选]
   *   执行 callback 时，用于 this 的值。
   * @returns 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
   * @notice 1. callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。
   *         2. filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到
   *            数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 
   *            遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。
   */
  Array.prototype._filter = function(callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var res = [],
      length = this.length;

    if(!length){
      return res;
    }

    // 获取所有非empty项的索引： some不会遍历那些在稀松数组中为empty的项
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        index, item;
    for(var i = 0, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      item = this[index];
      // 将callback的返回值强制转成布尔值
      if (!!callback.call(thisArg, item, index, this)) {
        res._push(item);
      }
    }

    return res;
  };

  /**
   * @description 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
   * @param {Function} callback
   *   执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
   *   accumulator
   *     累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
   *   currentValue
   *     数组中正在处理的元素。
   *   index [可选]
   *     数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
   *   array [可选]
   *     调用reduce()的数组
   * @param {any} initialValue
   *   作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。
   *   在没有初始值的空数组上调用 reduce 将报错。
   * @returns {any} 函数累计处理的结果
   * @notice 1. reduce为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素。
   *         2. 如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）
   *            并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且
   *            callback不会被执行。
   *         3. 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
   *            如果提供initialValue，从索引0开始。
   */
  Array.prototype._reduce = function(callback, initialValue) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 获取所有非empty项的索引： some不会遍历那些在稀松数组中为empty的项
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        notEmptyLength = notEmptyIndexs.length,
        startIndex = 0;

    if (!notEmptyLength && initialValue !== void 0) {
      // 如果提供了initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
      return initialValue;
    }

    if (initialValue === void (0)) {
      if (!notEmptyLength) {
        // 如果数组为空且没有提供initialValue，会抛出TypeError 。
        throw new TypeError("Reduce of empty array with no initial value");
      }

      if (notEmptyLength === 1) {
        // 如果数组仅有一个元素（无论位置如何）并且没有提供initialValue，那么此唯一值将被返回并且callback不会被执行。
        return this[0];
      }
      /**
       * currentValue取数组中的第一个值（非empty项 和 已被删除项）；如果没有提供 initialValue，那么accumulator取数组中的第一个值，
       * currentValue取数组中的第二个值。
       */
      initialValue = this[notEmptyIndexs[startIndex++]];
    }

    var accumulator = initialValue,
        index;

    // 如果是未被赋值（empty项）索引 或者 已被删除的索引，则不调用callback函数
    for(var i = startIndex, l = notEmptyIndexs.length; i < l; i++){
      index = notEmptyIndexs[i];
      accumulator = callback(accumulator, this[index], index, this);
    }

    return accumulator;
  };

  /**
   * @description 接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
   * @param {Function} callback
   *   一个回调函数，用于操作数组中的每个元素，它可接受四个参数：
   *     accumulator
   *       累加器：上一次调用回调函数时，回调函数返回的值。首次调用回调函数时，如果 initialValue 存在，累加器即为 initialValue，否则须为数组中的最后一个元素（详见下方 initialValue 处相关说明）。
   *     currentValue
   *       当前元素：当前被处理的元素。
   *     index [可选]
   *       数组中当前被处理的元素的索引。
   *     array [可选]
   *       调用 reduceRight() 的数组。
   * @param {any} initialValue
   *   首次调用 callback 函数时，累加器 accumulator 的值。如果未提供该初始值，
   *   则将使用数组中的最后一个元素，并跳过该元素。如果不给出初始值，则需保证数组不为空。
   *   否则，在空数组上调用 reduce 或 reduceRight 且未提供初始值
   *   （例如 [].reduce( (acc, cur, idx, arr) => {} ) ）的话，会导致类型错误
   *   TypeError: reduce of empty array with no initial value。
   * @returns {any} 执行之后的返回值。
   * @notice 1. reduceRight 为数组中每个元素调用一次 callback 回调函数，但是数组中被删除的索引或从未被赋值的索引会跳过。
   *         2. 如果在调用 reduceRight 时提供了 initialValue 参数，则 accumulator 等于 initialValue，currentValue 
   *            等于数组中的最后一个元素（非empty项 和 已被删除项）。
   *         3. 如果没有提供 initialValue 参数，则 accumulator 等于数组最后一个元素， currentValue 
   *            等于数组中倒数第二个元素 （非empty项 和 已被删除项）。
   */
  Array.prototype._reduceRight = function(callback, initialValue) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 获取所有非empty项的索引： some不会遍历那些在稀松数组中为empty的项
    var notEmptyIndexs = getNotEmptyIndexsOfArray(this),
        notEmptyLength = notEmptyIndexs.length,
        startIndex = notEmptyLength - 1;

    if (!notEmptyLength && initialValue !== void 0) {
      // 如果提供了initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
      return initialValue;
    }

    if (initialValue === void 0) {
      if (!notEmptyLength) {
        // 如果数组为空且没有提供initialValue，会抛出TypeError 。
        throw new TypeError("reduceRight of empty array with no initial value");
      }

      if (notEmptyLength === 1) {
        // 如果数组仅有一个元素（无论位置如何）并且没有提供initialValue，那么此唯一值将被返回并且callback不会被执行。
        return this[0];
      }

      initialValue = this[notEmptyIndexs[startIndex--]];
    }

    var accumulator = initialValue,
        index;
    
    // 如果是未被赋值（empty项）索引 或者 已被删除的索引，则不调用callback函数
    for(var i = startIndex; i >= 0; i--){
      index = notEmptyIndexs[i];
      accumulator = callback(accumulator, this[index], index, this);
    }

    return accumulator;
  };

  /**
   * @description 去除数组中的重复项
   * @returns {Array} 返回去除重复项后的新数组
   */
  Array.prototype._unique = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var length = this.length,
        res = [];

    if (length <= 1) {
      return this._slice();
    }

    var hashTable = {},
      refObjList = [],
      item;
    for (var i = 0; i < length; i++) {
      item = this[i];
      if ((item !== null && typeof item === "object") || typeof item === "function") {
        // 引用类型 比较地址
        if (
            !refObjList._some(function(element) {
              return element.value === item;
            })
           ) {
          refObjList._push({
            index: i,
            value: item,
          });

          res._push(refObjList[refObjList.length - 1]);
        }
      } else {
        // 基本类型 比较值
        if (!hashTable.hasOwnProperty(item)) {
          hashTable[item] = {
            index: i,
            value: item,
          };

          res._push(hashTable[item]);
        }
      }
    }

    // 按照原索引排序
    res._sort(function(a, b) {
      return a.index - b.index;
    });

    for (var i = 0, l = res.length; i < l; i++) {
      res[i] = res[i].value;
    }

    return res;
  };

  // ==================================== 迭代器遍历部分 ============================================== //

  /**
   * @description 返回一个包含数组中每个索引键的Array Iterator对象。
   * @returns {Array Iterator} 一个新的 Array 迭代器对象。
   */
  Array.prototype._keys = function*() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    for (var i = 0, l = this.length; i < l; i++) {
      yield i;
    }
  };

  /**
   * @description 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
   * @returns {Array Iterator} 一个新的 Array 迭代器对象。
   */
  Array.prototype._values = function*() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    for (var i = 0, l = this.length; i < l; i++) {
      yield this[i];
    }
  };

  /**
   * @description 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
   * @returns {Array Iterator} 一个新的 Array 迭代器对象。Array Iterator是对象，
   *                           它的原型（__proto__:Array Iterator）上有一个next方法，
   *                           可用用于遍历迭代器取得原数组的[key,value]。
   */
  Array.prototype._entries = function*() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    for (var i = 0, l = this.length; i < l; i++) {
      yield [i, this[i]];
    }
  };

  // ==================================== toString部分 ============================================== //

  /**
   * @description 返回一个字符串，表示指定的数组及其元素。
   * @returns {String} 一个表示指定的数组及其元素的字符串。
   */
  Array.prototype._toString = function() {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var res = "",
      length = this.length;

    if (!length) {
      return res;
    }

    res += this._join(",");

    return res;
  };
})();

