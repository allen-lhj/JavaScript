/**
 * 双端队列：是一种允许我们同时从前端和后端添加和移除元素的特殊队列
 * 常见的应用是存储一系列的撤销操作。当用户在软件中进行操作就会被存在一个双端队列中（就像一个栈中），
 * 当用户点击撤销，该操作就会从双端队列弹出，表示他被从后面移除了，
 * 在进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列的前端移除。
 * 双端队列同事遵守了先进先出和后进先出的原则，可以说它是把队列和栈相结合的一种数据结构
 */

class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    // 队列大小
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString += `${objString} , ${this.items[i]}`
        }
    } 
    // 添加新元素，只能添加到队列末尾
    addBack(element) {
        this.items[this.count] = element;
        this.count ++;
    }
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count --;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1]
    }
    // 该方法在双端队列前端添加新的元素
    addFront(element) {
        // 如果是空的
        if (this.isEmpty()) {
            this.addBack(element);
            // 如果之前一个元素已经删除过
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        // lowestCount 为0，其他元素向后移
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
}
const deque = new Deque();
console.log(deque.isEmpty())
deque.addBack('John')
deque.addBack('Jack')
console.log(deque.toString())


function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
        return false;
    }
    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar, lastChar;

    for(let i = 0; i < lowerString.length; i ++) {
        deque.addBack(lowerString.charAt(i));
    }
    while(deque.size() > 1 && isEqual) {

    }
}