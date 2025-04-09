const adPattern = /baidu\.com.*(adservice|cpro|ads|ssp|track|log|hm|adx|baijiahao|monitor|vstat)/;
const jsBlockList = [
  "baidu.com/ads.",
  "baidu.com/cpro",
  "cpro.baidu.com",
  "ssp.baidu.com",
  "adservice.baidu.com",
  "hm.baidu.com",
  "track.baidu.com",
  "baijiahao.baidu.com/api",
  "baijiahao.baidu.com/v1"
];

// 明确的广告 JS 文件名
const jsFileBlockList = [
  "show_ads.js",
  "adsbygoogle.js",
  "track.js",
  "cpro.js"
];

// 是否是广告类 JS
function isAdScript(url) {
  return adPattern.test(url) || jsBlockList.some(part => url.includes(part)) || jsFileBlockList.some(name => url.includes(name));
}

// 如果是广告类 JS，阻断；否则放行
if (isAdScript($request.url)) {
  $done({ response: { status: 403, body: "" } });
} else {
  $done();
}