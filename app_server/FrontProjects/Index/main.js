import sha1 from "crypto-js/sha1"


const APP_ID = '<your appid>';
let noncestr = Math.random();
let timestamp = Math.floor(Date.now() / 1000);
let url = `${location.origin}${location.pathname}${location.search}`;
let jsapi_ticket = document.querySelector(".vars .jsapi_ticket").innerHTML;

console.log(jsapi_ticket);
let sig = sha1(`jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`).toString();
console.log(sig);

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: APP_ID, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: sig,// 必填，签名
    jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
});

wx.ready(function () {
    wx.updateAppMessageShareData({
        title: '强大的消息', // 分享标题
        desc: '强大的描述', // 分享描述
        link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://yunp.top:3000/icon.png', // 分享图标
        success: function () {
            // 设置成功
            console.log("设置成功");
        }
    })
});