window = {};
importScripts('./TronWeb.js');
self.addEventListener('message', function (e) {
    var data = e.data;
    head = data.head;
    tail = data.tail;
    createWallet();
}, false);

let head;
let tail;
function createWallet() {
    if (!head) {
        head = "T";
    } else {
        head = "" + head;
    }
    let fullNode = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    let solidityNode = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    let eventServer = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    const privateKey = '16337E16D92C6CC79C37580BC1DE022EA73EB668CC6305FC613D70843480362D';
    const tronWeb = new window.TronWeb(fullNode, solidityNode, eventServer, privateKey);
    _createCoolWallet(tronWeb, head, tail);
}

function _createCoolWallet(tronWeb, head, tail) {
    tronWeb.createAccount().then(account => {
        var address = account.address.base58;
        if (tail && address.endsWith(tail)) {
            // console.log("tail-account", account);
        }
        if (address.startsWith(head)) {
            if (!tail || address.endsWith(tail)) {
                self.postMessage({
                    address: address,
                    privateKey: account.privateKey
                });
                self.close();
                return;
            }
        }
        _createCoolWallet(tronWeb, head, tail);
    });
}