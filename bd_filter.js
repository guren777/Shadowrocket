// ==Script==
// @name         Shadowrocket - Baidu AdBlock
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

// 删除首页推广模块
body = body.replace(/<div[^>]+id="?s_top_ad_banner"?[^>]*>[\s\S]*?<\/div>/gi, '');

// 删除搜索结果中的“广告/推广”模块
body = body
  .replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi, '')
  .replace(/<span[^>]*>广告<\/span>/gi, '')
  .replace(/"isAd":true,[^}]*}/gi, '')
  .replace(/"ad_type":\d+,[^}]*}/gi, '');

// 删除百度知道页面顶部/底部广告
body = body.replace(/<div[^>]+class="?zhidao_ad[^>]*>[\s\S]*?<\/div>/gi, '');

// 清理百度统计和推送
body = body
  .replace(/<script[^>]+hm\.baidu\.com[^<]+<\/script>/gi, '')
  .replace(/<script[^>]+push\.zhanzhang\.baidu\.com[^<]+<\/script>/gi, '');

// 返回修改后的响应体
$done({ body });