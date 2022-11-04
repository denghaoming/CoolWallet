let workers = [];
let workerLen = 32;
function createWallet() {
    let head = $("#head").val();
    let tail = $("#tail").val();
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    $(".address").text("");
    $(".privateKey").text("");

    workers = [];
    for (let i = 0; i < workerLen; ++i) {
        //本地跑
        //  let worker = new Worker('/js/index-worker.js', { name: 'worker' + i });
        //Github在线版
        let worker = new Worker('https://denghaoming.github.io/CoolWallet/js/index-worker.js', { name: 'worker' + i });
        workers.push(worker);
        worker.postMessage({ head: head, tail: tail });
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
    for (let i = 0; i < workerLen; ++i) {
        workers[i].terminate();
    }
}

$(function () {

});