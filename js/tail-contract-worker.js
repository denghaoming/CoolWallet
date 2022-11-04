window = {};
importScripts('./web3.min.js', './ethers.umd.min.js');
self.addEventListener('message', function (e) {
    var data = e.data;
    if (data.success) {
        self.close();
        return;
    }
    tail = data.tail;
    head = data.head;
    createWallet();
}, false);

let head = '';
let tail = '';
function createWallet() {
    const web3 = new window.Web3(window.Web3.givenProvider);
    // console.log('name', self.name);
    // console.log('token0',token0);
    // console.log('tail',tail);
    // console.log('web3',web3);
    // console.log('window',window);
    _createCoolWallet(web3, tail, head);
}

function _createCoolWallet(web3, tail, head) {
    if (!head) {
        head = "0x";
    } else {
        head = "0x" + head;
    }
    if(tail){
        tail = tail.toUpperCase();
    }
    for (; ;) {
        // console.log(self.name,'running');
        let account = web3.eth.accounts.create();
        let contractAddress = window._ethers.utils.getContractAddress({ from: account.address, nonce: 0 });
        if (!contractAddress.startsWith(head)) {
            continue;
        }
        if (tail) {
            if (!contractAddress.toUpperCase().endsWith(tail)) {
                continue;
            }
        }
        console.log("contractAddress", contractAddress);
        console.log('address', account.address);
        contractAddress = window._ethers.utils.getContractAddress({ from: account.address, nonce: 0 });
        console.log("contractAddress", contractAddress);
        self.postMessage({
            contractAddress: contractAddress,
            address: account.address,
            privateKey: account.privateKey
        });
        self.close();
        break;
    }
}