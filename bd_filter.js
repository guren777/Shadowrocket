// ==Script==
// @name         Shadowrocket - Baidu AdBlock (强力版)
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

if (!body || typeof body !== 'string') {
  $done({});
  return;
}

// 通用广告关键词正则
const adKeywords = /(广告|商业推广|百度推广|百度广告|推广)/gi;

// 移除 script 中百度统计与推广相关域名
body = body.replace(/<script[^>]+(hm|zhanzhang|cpro|track|log)\.baidu\.com[^<]*?<\/script>/gi, '');

// 隐藏包含广告关键词的完整条目（div 或其它容器）
body = body.replace(/<div[^>]*>([\s\S]*?)(广告|百度推广|商业推广)([\s\S]*?)<\/div>/gi, match => {
  if (match.length < 6000) { // 限制匹配大小防止误伤
    return `<div style="display:none!important;"></div>`;
  }
  return match;
});

// 隐藏特定 class 或属性标记的广告模块
const classRegexList = [
  /<div[^>]+class="[^"]*(ec-ad|ec-pc-trust|result-op|adsbygoogle|baidu_ad|tuiguang|ad-top|ad-footer)[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
  /<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi,
  /<div[^>]+id="(ecomAd|adBottom|adTop|content_right_rail)[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
  /<div[^>]*>[\s\S]*?<span[^>]*>广告<\/span>[\s\S]*?<\/div>/gi
];

for (const regex of classRegexList) {
  body = body.replace(regex, '<div style="display:none!important;"></div>');
}

// 也隐藏百度知道类广告样式
body = body.replace(/<div[^>]+class="zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '<div style="display:none!important;"></div>');

$done({ body });