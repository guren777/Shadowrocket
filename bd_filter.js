// 百度广告过滤脚本
const blockedDomains = [
  "adservice.baidu.com",
  "track.baidu.com",
  "adlog.baidu.com",
  "cpro.baidu.com",
  "ssp.baidu.com",
  "hm.baidu.com",
  "vstat.baidu.com",
  "baijiahao.baidu.com",
  "fex.baidu.com",
  "log.baidu.com",
  "baidu.com",
  "ms.bdstatic.com"
];

// 检查请求是否来自广告域名
function isBlockedDomain(url) {
  return blockedDomains.some(domain => url.includes(domain));
}

// 检查请求是否是广告资源
function isBlockedRequest(url) {
  // 精确匹配特定广告文件（如你提供的 share.js 文件）
  if (url.includes("share.js")) {
    return true; // 拦截该文件
  }

  return (
    isBlockedDomain(url) && 
    (url.includes("ads") || 
     url.includes("promo") || 
     url.includes("track") || 
     url.includes("monitor") ||
     url.includes("baijiahao") ||
     /\.(jpg|png|gif|js|css|html|json|mp4)$/.test(url))
  );
}

// 处理拦截的请求
$httpClient.get = function(url, callback) {
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