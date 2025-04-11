// ==Script==
// @name         Shadowrocket - Baidu Full AdBlock
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

// 移除首页顶部广告块
body = body.replace(/<div[^>]+id="?s_top_ad_banner"?[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除“推广”类搜索结果（含 data-tuiguang 属性或 class 中含广告标识）
body = body.replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi, '');
body = body.replace(/<div[^>]+class="[^"]*(ad|ec-ad|result-op)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 百度知道广告清除
body = body.replace(/<div[^>]+class="[^"]*zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 清理脚本类统计或推送代码
body = body.replace(/<script[^>]*?hm\.baidu\.com.*?<\/script>/gi, '');
body = body.replace(/<script[^>]*?zhanzhang\.baidu\.com.*?<\/script>/gi, '');

// 精准清除 JSON 响应中的广告字段（比如 isAd=true）
body = body.replace(/"isAd":true/gi, '"isAd":false');
body = body.replace(/"ad_type":\d+/gi, '"ad_type":0');
body = body.replace(/"ad_info":\{[\s\S]*?\}/gi, '"ad_info":{}');
body = body.replace(/"adData":\[[\s\S]*?\]/gi, '"adData":[]');

// 返回修改后的内容
$done({ body });