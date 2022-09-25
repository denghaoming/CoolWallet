let workers = [];
let workerLen = 32;
function createWallet() {
    let token0 = $("#token0").val();
    let tail = $("#tail").val();
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    workers = [];
    for (let i = 0; i < workerLen; ++i) {
        let worker = new Worker('../js/tail-contract-worker.js', { name: 'worker' + i });
        workers.push(worker);
        worker.postMessage({ token0: token0, tail: tail });
        worker.onmessage = function (event) {
            onWorkMessage(event.data);
        }
    }
}

function onWorkMessage(data) {
    console.log('onWorkMessage', data);
    $("#loading").text("");
    $(".address").text("地址：" + data.address);
    $(".privateKey").text("私钥：" + data.privateKey);
    $(".contract").text("合约：" + data.contractAddress);
    for (let i = 0; i < workerLen; ++i) {
        workers[i].terminate();
    }
}

$(function () {

});