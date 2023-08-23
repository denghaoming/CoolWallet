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
    token0 = data.token0;
    createWallet();
}, false);

let head = '';
let tail = '';
let token0 = '';
function createWallet() {
    const web3 = new window.Web3(window.Web3.givenProvider);
    // console.log('name', self.name);
    // console.log('token0',token0);
    // console.log('tail',tail);
    // console.log('web3',web3);
    // console.log('window',window);
    _createCoolWallet(web3, tail, head, token0);
}

function _createCoolWallet(web3, tail, head, token0) {
    if (!head) {
        head = "0x";
    } else {
        head = "0x" + head;
    }
    let token0Int = new window.Web3.utils.BN(0);
    if (token0) {
        token0Int = new window.Web3.utils.BN(token0.replace('0x', ''), 16);
    }
    if (tail) {
        tail = tail;
    }
    for (; ;) {
        // console.log(self.name,'running');
        let account = web3.eth.accounts.create();
        let contractAddress = window._ethers.utils.getContractAddress({ from: account.address, nonce: 0 });
        if (!contractAddress.startsWith(head)) {
            continue;
        }
        if (tail) {
            if (!contractAddress.endsWith(tail)) {
                continue;
            }
        }
        let token1 = new window.Web3.utils.BN(contractAddress.replace('0x', ''), 16);
        if (token1.lte(token0Int)) {
            continue;
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