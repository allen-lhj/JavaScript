/**
 * 队列是遵循先进先出原则的一组有序的项，
 * 队列在尾部添加新元素，从顶部移除元素。最新添加的元素必须排在队列的末尾
 * 例子：排队，打印
 */

// count: 队列的大小
// lowestcount 追踪第一个元素
class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 添加新元素，只能添加到队列末尾
    enqueue(element) {
        this.items[this.count] = element;
        this.count ++;
    }
    // 移除元素，只能从头部移除
    depueue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 队列是否为空
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    // 队列大小
    size() {
        return this.count - this.lowestCount;
    }
    // 检查队列头元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
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
}
