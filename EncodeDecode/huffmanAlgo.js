class Node {
    constructor(ch, freq, left, right) {
        this.ch = ch
        this.freq = freq
        this.left = left
        this.right = right           
    }
}

function operator(l, r){
    return l.freq, r.freq
}

class buildHuffmanTree{
    
    constructor(){
        this.freq={};
        this.priorityQueue = [];   // use arrays as queue in js. used push() to insert value and shift() as pop() method in queue
        this.nodeList = []
        this.root;
        this.decodeWord="";      
        this.huffmanCodes;
        console.log("hi")
    }

    setEncodeWord(text){        
        let code="";
        for(let ch of text){
            code += huffmanCodes[ch]
        }      
        return code;
    }

    getHuffmanTree(text){
        this.create_frequecty(text);
        this.sort_frequency()
        this.create_nodeList();
        this.huffmanCodes = this.createHufmanTree();  
        return this.huffmanCode
    }

    decode_the_encoded(code){
        let index=-1
        this.decodeWord=""
        while(index < code.length-2){
            index = this.decode(this.nodeList[0], index, code)
        }
        return this.decodeWord;
    }

    //count frequecy of string characters
    create_frequecty(text)
    {   
        try{
            for(let ch of text){
                if(this.freq[ch]){
                    this.freq[ch]++
                }else{
                    this.freq[ch] = 1
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    //sort the frequecy array according the increasing order of the char frequency
    sort_frequency() 
    {
        try{
            for (var a in this.freq){
                this.priorityQueue.push([a, this.freq[a]]);
            }
            // console.log(this.priorityQueue.length)
            for(let i=0; i< this.priorityQueue.length-1;i++){
                console.log(this.priorityQueue[i])
                for(let j=i+1; j< this.priorityQueue.length;j++){
                    if(this.priorityQueue[i][1] > this.priorityQueue[j][1]){
                        let temp = this.priorityQueue[j]
                        this.priorityQueue[j] = this.priorityQueue[i]
                        this.priorityQueue[i] = temp
                    }
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    //create a leaf node for each character and assign node list into queue
    create_nodeList(){
        for(let ch in this.priorityQueue){
            this.nodeList.push(this.getNode(this.priorityQueue[ch], this.priorityQueue[ch][1], null, null))
            console.log(this.nodeList)
        }
    }

    getNode(ch, freq, left, right) {
        var node = new Node(ch, freq, left, right) ;
        return node;
    }
    
    //create the hufmanTree
    createHufmanTree(){
        try{
            console.log(this.nodeList.length)
            while(this.nodeList.length !=1){
                const left = this.nodeList.shift()
                const right = this.nodeList.shift()

                // Create a new internal node with these two nodes as children and with frequency equal to the sum
                // of the two nodes' frequencies. Add the new node to the priority queue.
                let sum = left.freq + right.freq;
                this.nodeList.push(this.getNode('\0', sum, left, right))
            }

            this.root = this.nodeList[0]
            this.huffmanCode = []
            this.encode(this.root, "", this.huffmanCode)
        }catch(error){
            console.log(error)
        }
        return this.huffmanCode;
    }

    // traverse the Huffman Tree and store Huffman Codes in a map.
    encode(root, code, huffmanCode){
        try{
            if(root == null)
                return;
            
            if(!root.left && !root.right){
                huffmanCode[root.ch[0]] = code
            }

            this.encode(root.left, code+"0", huffmanCode)
            this.encode(root.right, code+"1", huffmanCode)
        }catch(error){
            console.log(error)
        }
    }

    // traverse the Huffman Tree and decode the encoded string
    decode(root, index, code, word){ 
        try{       
            if(root == null){
                return
            }

            if(!root.left && !root.right){
                this.decodeWord = this.decodeWord + root.ch[0]
                return index++;
            }

            index++;
            if(code[index] == '0'){
                index = this.decode(root.left, index, code, word)
            }else{
                index = this.decode(root.right, index, code, word) 
            }
        }catch(error){
            console.log(error)
        }
        return index
    }
}
