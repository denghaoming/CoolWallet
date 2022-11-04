let workers = [];
let workerLen = 24;
function createWallet() {
    let head = $("#head").val();
    let tail = $("#tail").val();
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    $(".address").text("");
    $(".privateKey").text("");
    $(".contract").text("");
    workers = [];
    for (let i = 0; i < workerLen; ++i) {
        //本地
        // let worker = new Worker('./js/tail-contract-worker.js', { name: 'worker' + i });
        //Github
        let worker = new Worker('https://denghaoming.github.io/CoolWallet/js/tail-contract-worker.js', { name: 'worker' + i });
        workers.push(worker);
        worker.postMessage({tail: tail, head: head });
        worker.onmessage = function (event) {
            onWorkMessage(event.data);
        }
    }
}

function onWorkMessage(data) {
    console.log('onWorkMessage', data);
    $("#loading").text("");
    $(".address").text(data.address);
    $(".privateKey").text(data.privateKey);
    $(".contract").text(data.contractAddress);
    for (let i = 0; i < workerLen; ++i) {
        workers[i].terminate();
    }
}

$(function () {

});