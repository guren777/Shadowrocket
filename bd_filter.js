// 百度广告与追踪脚本过滤

// 定义要屏蔽的域名和广告路径
const adUrls = [
  /baidu\.com\/.*(ads|promo|track|monitor|cpro|ssp|adlog|adservice|adx|fex|log|hm|vstat|cb|baijiahao)\b.*$/,
  /baidu\.com\/.*\.(jpg|png|gif|js|css|html|mp4|json)$/,
  /baidustatic\.com\/.*\.(js|css|gif|jpg|png|mp4|html|json)$/,
];

// 检测请求是否属于广告资源
function isAdRequest(url) {
  return adUrls.some(pattern => pattern.test(url));
}

// 处理 HTTP 响应拦截
$httpClient.get = function (url, callback) {
  if (isAdRequest(url)) {
    callback({ status: 200, body: "" });  // 拒绝加载广告资源，返回空响应
  } else {
    $httpClient.get(url, callback);  // 非广告请求正常加载
  }
};

// 检查是否需要拦截广告请求
if (isAdRequest($request.url)) {
  $done({ response: { statusCode: 403 } });  // 拦截广告请求，返回禁止状态
} else {
  $done();  // 继续请求
}