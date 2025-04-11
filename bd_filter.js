// ==Script==
// @name         Shadowrocket - Baidu AdBlock (Safe Version)
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

// 安全地移除首页顶部推广 div（使用非贪婪匹配）
body = body.replace(/<div[^>]+id="?s_top_ad_banner"?[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除搜索结果页的“商业推广”相关模块（不破坏 JSON 结构）
body = body
  .replace(/<span[^>]*>广告<\/span>/gi, '')
  .replace(/"isAd":\s?true/gi, '"isAd":false')
  .replace(/"ad_type":\s?\d+/gi, '"ad_type":0');

// 移除百度知道中常见的广告 div（使用 class 名关键词）
body = body.replace(/<div[^>]+class="[^"]*zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除百度统计和推送脚本（非贪婪）
body = body
  .replace(/<script[^>]*?hm\.baidu\.com.*?<\/script>/gi, '')
  .replace(/<script[^>]*?zhanzhang\.baidu\.com.*?<\/script>/gi, '');

// 仅当 body 不为空再返回，否则原样处理，避免页面崩溃
if (body && body.length > 0) {
  $done({ body });
} else {
  $done({});
}