// 链表存储有序的元素集合，不同于数组，链表中的元素在内存中不是连续放置的，每个元素由一个存储元素本身的节点
// 和一个指向下一个元素的引用组成
// 添加或移除元素的时候，不需要移动其他元素。但是需要指针，
// 在数组中我们可以直接访问任何位置的任何元素，想要访问链表中间的一个元素，则需要从起点（表头）开始迭代，直到找到所需元素



// 添加到链表中的项
// element: 加入链表元素的值
// next：指向链表中下一个元素的指针

class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

function equalsFn(a, b) {
    return a === b;
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn
    }
    // 向链表尾部添加一个新元素,链表为空/不为空
    push(element) {
      const node = new Node(element);
      let current;
      if (this.head == null) {
          this.head = node;
      } else {
        // 将head给current，找到current为null的，如果不是null就将下一个往前移，
        // 将最后一个为空的next赋值为node
          current = this.head;
          while(current.next != null) {
              current = current.next;
          }
          // 将其next赋为新元素，建立链接
          current.next = node;
      }
      this.count++;
    }
    // 1.从特定位置移除一个元素
    // removeAt(index) {
    //     if (index >= 0 && index < this.count) {
    //         let current = this.head;
    //         // 移除第一项
    //         if (index === 0) {
    //             this.head = current.next;
    //         } else {
    //             // 移除最后一个或中间某一个，迭代链表，让current始终为链表循环中的当前元素
    //             let previous;
    //             for (let i = 0; i < index; i++) {
    //                 previous = current;
    //                 current = current.next;
    //             }
    //             // 将previous与current的下一项链接起来，跳过current，从而移除它
    //             previous.next = current.next;
    //         }
    //         this.count--;
    //         return current.element;
    //     }
    //     return undefined;
    // }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    // 在任意位置插入元素
    insert(element, index) {
        // 索引需要大于等于0，并且不能超过链表长度
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {// 在第一个位置添加
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    indexOf (element) {
      let current = this.head;
      for (var i = 0; i < this.count && this.count != null; i++) {
        if (this.equalsFn(element, current.element)) {
        return i;
        }
        current = current.next;
      }
      return -1;
    }
    remove(element) {
			const index = this.indexOf(element);
			return this.removeAt(index);
    }
		size() {
			return this.count;
		}
		isEmpty() {
			return this.size() === 0;
		}
		getHead() {
			return this.head;
		}
		toString() {
			if (this.head == null) {
				return '';
			}
			let objString = `${this.head.element}`;
			let current = this.head.next;
			for (let i = 1; i < this.size() && current != nulll; i++) {
				objString = `${objString}, ${current.element}`;
				current = current.next;
			}
			return objString;
		}
}

// DoublyNode 

class DoublyNode extends Node {
	constructor(element, next, prev) {
		super(element, next);
		this.prev = prev;
	}
}

class DoublyLinkeList extends LinkedList {
	constructor(equalsFn) {
		super(equalsFn);
		this.tail = undefined;
	}
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new DoublyNode(element);
			let current = this.head;
			// 在起点插入
			if (index === 0) {
				if (this.head == null) {
					this.head = node;
					this.tail = node;
				} else {
					current.next = this.head;
					current.prev = node;
					this.head = node;
				}
 			} else if (index === this.count) {
				 current = this.tail;
				 current.next = node;
				 node.prev = current;
				 this.tail = node;
			 } else {
				const previous = this.getElementAt(index-1);
				current = previous.next;
				node.next = current;
				previous.next = node;
				current.prev = node;
				node.prev = previous;
			 }
			 this.count++;
			 return true;
		}
		return false;
	}
	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = current.next;
				if (this.count === 1) {
					this.tail = undefined;
				} else {
					this.head.prev = undefined;
				}
			} else if (index === this.count - 1) {
				current = this.tail;
				this.tail = current.prev;
				this.tail.next = undefined;
			} else {
				current = this.getElementAt(index);
				const previous = current.prev;
				previous.next = current.next;
				current.next.prev = previous;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}