window = {};
importScripts('./web3.min.js');
self.addEventListener('message', function (e) {
    var data = e.data;
    head = data.head;
    tail = data.tail;
    createWallet();
}, false);

let head;
let tail;
function createWallet() {
    const web3 = new window.Web3(window.Web3.givenProvider);
    _createCoolWallet(web3, head, tail);
}

function _createCoolWallet(web3, head, tail) {
    if (!head) {
        head = "0x";
    } else {
        head = "0x" + head;
    }
    for (; ;) {
        let account = web3.eth.accounts.create();
        let address = account.address;
        // if (tail && address.endsWith(tail)) {

        // }
        if (address.startsWith(head)) {
            if (!tail || address.endsWith(tail)) {
                self.postMessage({
                    address: account.address,
                    privateKey: account.privateKey
                });
                self.close();
                break;
            }
        }
    }
}