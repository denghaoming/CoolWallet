function createWallet() {
    let head = $("#head").val();
    let tail = $("#tail").val();
    if (!head) {
        head = "0x";
    } else {
        head = "0x" + head;
    }
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    const web3 = new Web3(Web3.givenProvider);
    if (_createWalletTime) {
        clearTimeout(_createWalletTime);
    }
    _createCoolWallet(web3, head, tail);
}

var _createWalletTime;
function _createCoolWallet(web3, head, tail) {
    _createWalletTime = setTimeout(function () {
        var account = web3.eth.accounts.create();
        var address = account.address;
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
        _createCoolWallet(web3, head, tail);
    }, 1);
}

$(function () {

});