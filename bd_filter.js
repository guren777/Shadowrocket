// 百度广告和追踪过滤脚本
const rewriteUrl = /^https?:\/\/.*\.baidu\.com\/.*(ads|promo|track|monitor|cpro|ssp|adlog|adservice|adx|fex|log|hm|vstat|cb)\b.*$/;

$httpClient.get = function (url, callback) {
    if (rewriteUrl.test(url)) {
        callback({ status: 200, body: "" });  // 拒绝加载广告资源
    } else {
        $httpClient.get(url, callback);  // 继续加载非广告资源
    }
};

// 取消广告资源的加载
if (rewriteUrl.test($request.url)) {
    $done({ response: { statusCode: 403 } });  // 阻止广告请求
}