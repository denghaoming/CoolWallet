window = {};
importScripts('./web3.min.js', './ethers.umd.min.js');
self.addEventListener('message', function (e) {
    var data = e.data;
    if (data.success) {
        self.close();
        return;
    }
    if (data.token0) {
        token0 = data.token0;
    }
    tail = data.tail;
    createWallet();
}, false);

let token0 = '0xa22b5A5118c1d05d0D4c8f1B808DBa22ee17dD8E';
let tail = '888';
function createWallet() {
    const web3 = new window.Web3(window.Web3.givenProvider);
    // console.log('name', self.name);
    // console.log('token0',token0);
    // console.log('tail',tail);
    // console.log('web3',web3);
    // console.log('window',window);
    _createCoolWallet(web3, token0, tail);
}

function _createCoolWallet(web3, token0, tail) {
    token0 = new web3.utils.BN(token0.replace('0x', ''), 16);
    for (; ;) {
        // console.log(self.name,'running');
        let account = web3.eth.accounts.create();
        let contractAddress = window._ethers.utils.getContractAddress({ from: account.address, nonce: 0 });
        let token1 = new web3.utils.BN(contractAddress.replace('0x', ''), 16);
        //撤池子的时候，池子会先转出token0，
        //如果token0是别的币，在池子转出当前合约代币的时候，那就可以判断池子token0的balance和reverse0大小，是否撤池子
        //加池子，swap合约按照用户指定顺序转入代币
        //如果先转入别的币，在池子转入当前合约代币的时候，那就可以判断池子token0的balance和reverse0大小，是否加池子
        //综上，主要想办法让当前合约代币成为token1即可判断加池子，撤池子，买入和卖出
        //加池子时，需要指引用户，让用户将token0放在上面的输入框，合约代币作为token1放在下面的输入框，这样能保证先转入token0
        if (token1.gt(token0)) {
            if (tail) {
                if (!contractAddress.endsWith(tail)) {
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
}