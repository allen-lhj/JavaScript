/**
 * 栈是遵从后进先出原则的有序集合，新添加和待删除的元素都保存在同一端
 * 旧元素在栈底，新添加和待删除的元素都在栈顶
 * 栈常被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录。
 * */


class Stack {
    constructor() {
        this.count = 0; // 记录栈的大小
        this.items = {};
    }
    // 添加元素
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 返回栈的大小
    size() {
        return this.count;
    }
    // 栈是否为空
    isEmpty() {
        return this.count === 0;
    }
    // 栈顶弹出元素
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count --;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 访问栈顶元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1]
    }
    // 复原；
    clear() {
        this.count = 0;
        this.items = {};
    }
    // 除了toString方法其他方法的时间复杂度都是O(1)
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`;
        }
        return objString;
    }
}
// 将十进制转为二进制，将该十进制除以2，并对商取整，知道结果为0为止
function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while(number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }

    while (! remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}
// 转换2～36任意进制

function baseConverter(decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';

    if (!(base >= 2 && base <= 36)) {
        return '';
    }

    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    while (! remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }
    return baseString;
 }

console.log(baseConverter(100345, 16)) // 187F9
console.log(baseConverter(100345, 2)) // 11000011111111001
