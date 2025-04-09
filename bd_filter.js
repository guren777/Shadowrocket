// 百度精准广告拦截脚本
// 适用于 Shadowrocket 的 http-request 阶段
// 脚本类型：http-request
// 作用：精准拦截百度、百家号的广告和追踪请求，避免误伤功能型 JS

const adKeywordList = [
  'cpro.baidu.com',
  'ads',
  'adservice',
  'adx',
  'track',
  'log',
  'hm.baidu.com',
  'baijiahao.baidu.com/api/ad',
  'baijiahao.baidu.com/v1/ad',
  'ssp.baidu.com',
  'monitor',
  'promote',
  'eclick'
];

// 白名单关键词：用于放行正常 JS（功能/排版脚本）
const whitelistKeywordList = [
  'fusion-components',
  'share.js',
  'layout',
  'searchbox',
  'theme',
  'component',
  'common'
];

const url = $request.url;

// 判断是否命中广告关键词
function isAd(url) {
  return adKeywordList.some(keyword => url.includes(keyword));
}

// 判断是否是应放行的正常脚本
function isWhitelisted(url) {
  return whitelistKeywordList.some(keyword => url.includes(keyword));
}

// 拦截逻辑
if (isAd(url) && !isWhitelisted(url)) {
  // 拦广告，但跳过白名单
  $done({ response: { status: 403, body: '' } });
} else {
  $done(); // 放行
}