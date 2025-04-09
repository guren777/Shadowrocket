// 百度广告过滤脚本
const blockedUrls = [
  /baidu\.com\/.*(ads|promo|track|monitor|cpro|ssp|adlog|adservice|adx|fex|log|hm|vstat|cb|baijiahao)\b.*$/,
  /baidu\.com\/.*\.(jpg|png|gif|js|css|html|json|mp4)$/,
  /baidustatic\.com\/.*\.(js|css|gif|jpg|png|mp4|html|json)$/,
];

// 检查请求是否是广告或追踪请求
function isBlockedRequest(url) {
  return blockedUrls.some(pattern => pattern.test(url));
}

// 处理拦截的请求
$httpClient.get = function (url, callback) {
  if (isBlockedRequest(url)) {
    callback({ status: 200, body: "" });  // 拒绝加载广告资源
  } else {
    $httpClient.get(url, callback);  // 正常加载非广告资源
  }
};

// 如果是广告请求，拦截并返回403
if (isBlockedRequest($request.url)) {
  $done({ response: { statusCode: 403 } });  // 拦截广告请求
} else {
  $done();  // 继续请求
}