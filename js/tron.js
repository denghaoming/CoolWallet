function createWallet() {
    let head = $("#head").val();
    let tail = $("#tail").val();
    if (!head) {
        head = "T";
    } else {
        head = "" + head;
    }
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    let fullNode = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    let solidityNode = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    let eventServer = 'https://trx.getblock.io/mainnet/?api_key=bba35e6d-52e3-40fa-a299-c8f462c1ee64';
    const privateKey = '16337E16D92C6CC79C37580BC1DE022EA73EB668CC6305FC613D70843480362D';
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    if (_createWalletTime) {
        clearTimeout(_createWalletTime);
    }
    _createCoolWallet(tronWeb, head, tail);
}

var _createWalletTime;
function _createCoolWallet(tronWeb, head, tail) {
    _createWalletTime = setTimeout(function () {
        tronWeb.createAccount().then(account => {
            var address = account.address.base58;
            if (tail && address.endsWith(tail)) {
                console.log("tail-account", account);
            }
            if (address.startsWith(head)) {
                // console.log("head-account", account);
                if (!tail || address.endsWith(tail)) {
                    $("#loading").text("");
                    $(".address").text("地址：" + address);
                    $(".privateKey").text("私钥：" + account.privateKey);
                    return;
                }
            }
            _createCoolWallet(tronWeb, head, tail);
        });
    }, 1);
}

$(function () {

});