const input = document.getElementById("input");
const addBtn = document.getElementById("add_button");
const removeBtn = document.getElementById("remove_button");
const clearBtn = document.getElementById("clear_button");
const btHeapBtn = document.getElementById("bt_heap_btn");
const tableCells = document.querySelectorAll("th");
const header = document.querySelector(".header");
const controls = document.querySelector(".controls");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const height = window.innerHeight;
const width = window.innerWidth;
console.log(height, width)

const displayHeight = (val = -1) => {;
    let x = 120;
    let y = 515;
    if (val === -1) {
        x = 12;
        y = 520;
    };

    ctx.font = "normal 12pt Calibri";
    ctx.fillStyle = "#9e9e9e";
    ctx.fillText(`Current Height: ${val} (Max Height: 4)`, x, y);
    ctx.stroke();
};

const addedElems = (result) => {
    tableCells.forEach((cell, i) => {
        cell.textContent = result[i] ? result[i] : "";
    });
};

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    };
};

class MinHeap  {
    constructor() {
        this.minHeap = [null];
        this.maxHeap = [null];
        this.minHeapTree = null;
        this.maxHeapTree = null;
        this.heapResult = null;
        this.heapType = "Min Heap";
    };

    addToMinHeap(num) {
        if (!this.minHeap.includes(num) && this.minHeap.length < 32) {
            this.minHeap.push(num);
            if (this.minHeap.length > 2) {
                let idx = this.minHeap.length - 1;
                if (idx >= 1) {
                    while(this.minHeap[idx] < this.minHeap[Math.floor(idx/2)]) {
                        [this.minHeap[Math.floor(idx/2)], this.minHeap[idx]] = [this.minHeap[idx], this.minHeap[Math.floor(idx/2)]];
                        if (idx > 1) {
                            idx = Math.floor(idx/2);
                        } else {
                            break;
                        };
                    };
                };
            };
            addedElems([...this.minHeap])
            this.createHeapTree();
        };
    };

    createHeapTree() {
        let arr;
        if (bst.heapType === "Min Heap") {
            arr = [...this.minHeap]
        } else if (bst.heapType === "Max Heap") {
            arr = [...this.maxHeap]
        };
        
        if (this.minHeapTree === null && bst.heapType === "Min Heap") {
            this.minHeapTree = new Node(this.minHeap[1]);
        } else if (this.maxHeapTree === null && bst.heapType === "Max Heap") {
            this.maxHeapTree = new Node(this.maxHeap[1]);
        } else {
            const helper = (node, left, right) => {
                if (arr[left]) {
                    node.left = new Node(arr[left]);
                    helper(node.left, 2 * left, 2 * left + 1);
                };

                if (arr[right]) {
                    node.right = new Node(arr[right]);
                    helper(node.right, 2 * right, 2 * right + 1);
                }; 
            };

            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            
            if (bst.heapType === "Min Heap") {
                this.minHeapTree = new Node(this.minHeap[1]);
                helper(this.minHeapTree, left, right);
            } else if (bst.heapType === "Max Heap") {
                this.maxHeapTree = new Node(this.maxHeap[1]);
                helper(this.maxHeapTree, left, right);
            };
        };

        this.drawTree();
    };

    removeFromMinHeap() {
        let smallest = this.minHeap[1];
        if (this.minHeap.length > 2) {
            this.minHeap[1] = this.minHeap[this.minHeap.length - 1];
            this.minHeap.splice(this.minHeap.length - 1);

            if (this.minHeap.length === 3) {
                if (this.minHeap[1] > this.minHeap[2]) {
                    [this.minHeap[1], this.minHeap[2]] = [this.minHeap[2], this.minHeap[1]];
                };
                
                addedElems([...this.minHeap])
                this.createHeapTree();
                return smallest;
            };

            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;

            while (this.minHeap[i] >= this.minHeap[left] || this.minHeap[i] >= this.minHeap[right]) {
                if (this.minHeap[left] < this.minHeap[right]) {
                    [this.minHeap[i], this.minHeap[left]] = [this.minHeap[left], this.minHeap[i]];
                    i = 2 * i;
                } else {
                    [this.minHeap[i], this.minHeap[right]] = [this.minHeap[right], this.minHeap[i]];
                    i = 2 * i + 1;
                };

                left = 2 * i;
                right = 2 * i + 1;

                if (this.minHeap[left] === undefined || this.minHeap[right] === undefined) {
                    break
                };
            };
        } else if (this.minHeap.length === 2) {
            this.minHeap.splice(1, 1);
        } else {
            return null;
        };
        
        addedElems([...this.minHeap])
        this.createHeapTree();
        return smallest;
    };

    addToMaxHeap(num) {
        if (!this.maxHeap.includes(num) && this.minHeap.length < 32) {
            this.maxHeap.push(num);
            if (this.maxHeap.length > 2) {
                let idx = this.maxHeap.length - 1;
                while (this.maxHeap[idx] > this.maxHeap[Math.floor(idx/2)]) {
                    if (idx >= 1) {
                        [this.maxHeap[Math.floor(idx/2)], this.maxHeap[idx]] = [this.maxHeap[idx], this.maxHeap[Math.floor(idx/2)]];
                        if (Math.floor(idx/2) > 1) {
                            idx = Math.floor(idx/2);
                        } else {
                            break;
                        };
                    };
                };
            };
            addedElems([...this.maxHeap])
            this.createHeapTree();
        };
	};
	
	removeFromMaxHeap() {
		let smallest = this.maxHeap[1];
		if (this.maxHeap.length > 2) {
			this.maxHeap[1] = this.maxHeap[this.maxHeap.length - 1];
			this.maxHeap.splice(this.maxHeap.length - 1);
			if (this.maxHeap.length == 3) {
				if (this.maxHeap[1] < this.maxHeap[2]) {
					[this.maxHeap[1], this.maxHeap[2]] = [this.maxHeap[2], this.maxHeap[1]];
				};
                addedElems([...this.maxHeap])
                this.createHeapTree();
				return smallest;
			};
			let i = 1;
			let left = 2 * i;
			let right = 2 * i + 1;
			while (this.maxHeap[i] <= this.maxHeap[left] || this.maxHeap[i] <= this.maxHeap[right]) {
				if (this.maxHeap[left] > this.maxHeap[right]) {
					[this.maxHeap[i], this.maxHeap[left]] = [this.maxHeap[left], this.maxHeap[i]];
					i = 2 * i
				} else {
					[this.maxHeap[i], this.maxHeap[right]] = [this.maxHeap[right], this.maxHeap[i]];
					i = 2 * i + 1;
				};
				left = 2 * i;
				right = 2 * i + 1;
				if (this.maxHeap[left] == undefined || this.maxHeap[right] == undefined) {
					break;
				};
			};
		} else if (this.maxHeap.length == 2) {
			this.maxHeap.splice(1, 1);
		} else {
			return null;
		};
        addedElems([...this.maxHeap])
        this.createHeapTree();
		return smallest;
	};
};

class BST extends MinHeap {
    constructor() {
        super()
        this.display = "bt";
        this.root = null;
        this.btResult = null;
        this.btMaxReached = false;
    };

    add(data) {
        let node = this.root;
        let count = -1;

        if(!node) {
            this.root = new Node(data);
            count++;
            this.drawTree(true);
            return this.root;

        } else {
            const searchTree = (node, count) => {
                if (data < node.data) {
                    if (node.left === null) {
                        if (count < 3) {
                            node.left = new Node(data);
                        };
                        return;

                    } else {
                        searchTree(node.left, count+1);
                    };

                } else if (data > node.data) {
                    if (node.right === null) {
                        if (count < 3) {
                            node.right = new Node(data);
                        };
                        return;

                    } else {
                        searchTree(node.right, count+1);
                    };
                } else{
                    return null;
                };
            };
            searchTree(node, count);
            this.drawTree(true);
            return this.root
        };
    };

    remove(data) {
        const removeNode = (node, data) => {
            if (node === null) {
                return null;
            };

            if (data === node.data) {
                if (node.left === null && node.right === null) {
                    return null;

                } else if (node.left === null) {
                    return node.right;

                } else if (node.right === null) {
                    return node.left;

                } else {
                    let tempNode = node.right;

                    while (tempNode.left !== null){
                        tempNode = tempNode.left;
                    };

                    node.data = tempNode.data;
                    node.right = removeNode(node.right, tempNode.data);
                    return node;
                };  
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;

            } else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            };
        };
        this.root = removeNode(this.root, data);
        this.drawTree(true);
    };

    findMaxHeight(node) {
        if (node === null) {
            return -1;
        };

        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);

        if (left > right) {
            return left + 1;

        } else {
            return right + 1;
        };
    };

    isBalanced() {
        if (this.findMaxHeight() === this.findMinHeight() || this.findMaxHeight()-1 === this.findMinHeight()) {
            return true;

        } else {
            return false;
        };
    };

    drawTree(BT=false) {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 1900, 533);
        let height = 0;
        const draw = (data, level, direction, x , y) => {
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI*2, false);
            ctx.lineWidth = 4;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 20pt Calibri";
            ctx.fillStyle = "black";
            ctx.fillText(data, x, y);
            ctx.stroke();

            if (level-1 > height) {
                height = level-1;
            };

            let xStart;
            let xEnd
	    let squeezeBy = 0
            // console.log(window.innerWidth)

            if (1180-window.innerWidth > 0) {
                squeezeBy = (1180-window.innerWidth)/(level*2.8)
            };

            let xPlusMinus = ((178-squeezeBy)-(((level-1)*(level-1))*10))

            if (level > 1) {
                if (level === 2) {
                    xPlusMinus = 300-((squeezeBy*2.8)/(level))
                };
                
                if (direction === "left") {
                    xStart=x+xPlusMinus-((36+level)/level)
                    xEnd=x+((32-level)/level);
                } else if (direction === "right") {
                    xStart=(x-xPlusMinus)+((36+level)/level)
                    xEnd=x-((32-level)/level);
                };
    
                ctx.moveTo(xStart, y-80-(((30-level)+level)/level));
                ctx.lineTo(xEnd, y-((4*level)+5-level));
                ctx.stroke();
            };
        };

        if (BT) {
            if (this.root === null) {
                addedElems(0);
                return null;
            };
        } else {
            if (bst.heapType === "Min Heap") {
                if (this.minHeapTree === null || this.minHeap.length === 1) {
                    addedElems(0);
                    return null;
                };
            } else if (bst.heapType === "Max Heap") {
                if (this.maxHeapTree === null || this.maxHeap.length === 1) {
                    addedElems(0);
                    return null;
                };
            }
        };

        let result = [];
        const traversePreOrder = (node, level, direction, x, y) => {
            if (level < 6) {
                result.push(node.data);
                draw(node.data, level, direction, x, y);
                let squeezeBy = 0
                // console.log(window.innerWidth)

                if (1180-window.innerWidth > 0) {
                    squeezeBy = (1180-window.innerWidth)/(level*4)
                };

                let xPlusMinus = ((180-squeezeBy)-((level*level)*10))
                if (level===1) {
                    xPlusMinus = 300-(squeezeBy/(level))
                };

                node.left && traversePreOrder(node.left, level+1, "left", x-xPlusMinus, y+100);
                node.right && traversePreOrder(node.right, level+1, "right", x+xPlusMinus, y+100);
            };
        };
        if (BT) {
            traversePreOrder(this.root, 1,  null, canvas.width/2, 50);
            this.btResult = result;
            displayHeight(height);
        } else {
            if (bst.heapType === "Min Heap") {
                traversePreOrder(this.minHeapTree, 1,  null, canvas.width/2, 50);
                displayHeight(height);
            } else if (bst.heapType === "Max Heap") {
                traversePreOrder(this.maxHeapTree, 1,  null, canvas.width/2, 50);
                displayHeight(height);
            };
        };
        addedElems(result);
    };
};

const bst = new BST();

function onLoad() {
    canvas.width = window.innerWidth-20;
};

onLoad();

function onResize() {
    canvas.width = window.innerWidth-20;
    bst.drawTree(true);
    console.log("Being resized")
};

window.addEventListener("resize", onResize)

const displayHeap = () => {
    btHeapBtn.textContent = "Try BinaryTree Visualizer...";
    header.textContent = "Heap Visualizer";
    const selectHeap = document.createElement("select");
    selectHeap.id = "select_heap";
    ["Min Heap", "Max Heap"].map((elem) => {
        let option = document.createElement("option");
        option.id = elem;
        option.value = elem;
        option.text = elem;
        option.addEventListener("click", () => {
            if (bst.heapType !== elem) {
                bst.heapType = elem;
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, 1900, 533);
                tableCells.forEach((cell, i) => {
                    cell.textContent = "";
                });
                if (bst.heapType === "Min Heap") {
                    removeBtn.textContent = "remove smallest";
                } else if (bst.heapType === "Max Heap") {
                    removeBtn.textContent = "remove largest";
                };

                if (bst.minHeapTree || bst.maxHeapTree) {
                    bst.drawTree();
                };
            };
        });

        selectHeap.appendChild(option);

        if (bst.heapType === elem) {
            option.selected = true;
            if (elem === "Min Heap") {
                removeBtn.textContent = "remove smallest";
            } else if (elem === "Max Heap") {
                removeBtn.textContent = "remove largest";
            };
        };
    });

    controls.prepend(selectHeap);
    tableCells.forEach((cell, i) => {
        cell.textContent = "";
    });

    const heapBullets = ["Info - Heap", "1. A Heap is a special tree based data structure. In which the tree is a complete BinaryTree.", 
    "2. In a Min Heap, the root key must be less than the keys of it's children.",
    "3. In a Max Heap, the root key must be greater than the keys of it's children.", 
    "4. In a Min Heap, the smallest key is the first to be popped off from the tree.",
    "5. In a Max Heap, the largest key is the first to be popped off from the tree."]

    const infoBullets = document.getElementById("info_bullets");

    infoBullets.childNodes.forEach((bullet) => {
        if (bullet.className !== "point" && bullet.className !== "info_header") {
            infoBullets.removeChild(bullet);
        };
    });

    infoBullets.childNodes.forEach((bullet, i) => {
        bullet.textContent = heapBullets[i];
    });

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1900, 533);
    if (bst.minHeapTree || bst.maxHeapTree) {
        bst.drawTree();
    };
};

const displayBT = () => {
    btHeapBtn.textContent = "Try Heap Visualizer...";
    header.textContent = "BinaryTree Visualizer";
    controls.removeChild(controls.childNodes[0]);
    tableCells.forEach((cell) => {
        cell.textContent = "";
    });
    removeBtn.textContent = "remove";

    const btBullets = ["Info - BinaryTree", "1. Each node in the BinaryTree can have a maximum of 2 children.", 
    "2. A leaf is a node with no children.",
    "3. A full BinaryTree is where every node has either 0 or 2 children.", 
    "4. Smallest value in the BinaryTree is the left most leaf and the largest is the right most.",
    "5. A complete binary tree is a binary tree in which all the levels are completely filled except possibly the lowest one, which is filled from the left."]

    const infoBullets = document.getElementById("info_bullets");

    infoBullets.childNodes.forEach((bullet, i) => {
        if (bullet.className !== "point" && bullet.className !== "info_header") {
            infoBullets.removeChild(bullet);
        };
    })

    infoBullets.childNodes.forEach((bullet, i) => {
        bullet.textContent = btBullets[i];
    });

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1900, 533);
    if (bst.root) {
        bst.drawTree(true);
    };
};

displayBT();

addBtn.addEventListener("click", () => {
    if (bst.display === "bt") {
        bst.add(Number(input.value));
    } else if (bst.display === "heap") {
        if (bst.heapType === "Min Heap") {
            bst.addToMinHeap(Number(input.value));
        } else if (bst.heapType === "Max Heap") {
            bst.addToMaxHeap(Number(input.value))
        };
    };
});

removeBtn.addEventListener("click", () => {
    if (bst.display === "bt") {
        bst.remove(Number(input.value));
    } else if (bst.display === "heap") {
        if (bst.heapType === "Min Heap") {
            bst.removeFromMinHeap(Number(input.value));
        } else if (bst.heapType === "Max Heap") {
            bst.removeFromMaxHeap(Number(input.value))
        };
    };
});

clearBtn.addEventListener("click", () => {
    if (bst.display === "bt") {
        bst.root = null;
        bst.drawTree(true);
    } else if (bst.display === "heap") {
        if (bst.heapType === "Min Heap") {
            bst.minHeap = [null];
            bst.minHeapTree = null;
        } else if (bst.heapType === "Max Heap") {
            bst.maxHeap = [null];
            bst.maxHeapTree = null;
        };
        bst.drawTree();
    };
});

btHeapBtn.addEventListener("click", () => {
    if (bst.display === "bt") {
        bst.display = "heap";
        displayHeap();
    } else if (bst.display === "heap") {
        bst.display = "bt";
        displayBT();
    };
})
