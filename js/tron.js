let workers = [];
let workerLen = 32;
function createWallet() {
    let head = $("#head").val();
    let tail = $("#tail").val();
    $("#loading").text("正在创建钱包，请耐心等待。。。");
    $(".address").text("地址：" );
    $(".privateKey").text("私钥：");

    workers = [];
    for (let i = 0; i < workerLen; ++i) {
        let worker = new Worker('./js/tron-worker.js', { name: 'worker' + i });
        workers.push(worker);
        worker.postMessage({head: head, tail:tail});
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
    for (let i = 0; i < workerLen; ++i) {
        workers[i].terminate();
    }
}

$(function () {

});