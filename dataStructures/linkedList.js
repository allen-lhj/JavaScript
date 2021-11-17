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

function defaultEquals(a, b) {
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
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                // 移除最后一个或中间某一个，迭代链表，让current始终为链表循环中的当前元素
                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next;
                }
                // 将previous与current的下一项链接起来，跳过current，从而移除它
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
const list = new LinkedList()
list.push(5)
list.push(20)
console.log(list)
list.removeAt(1)
console.log(list)