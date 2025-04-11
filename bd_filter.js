/**
 * 百度广告拦截脚本
 * 功能：拦截百度首页、搜索结果页面的广告元素及相关资源
 * Author: GPT-4
 * 适用于 Shadowrocket / QuantumultX
 * 
 */

// 定义网页响应处理逻辑
let body = $response.body;

// 正则匹配广告内容，去除百度广告
body = body.replace(/<div[^>]+class="?s_top_ad_banner"?[^>]*>[\s\S]*?<\/div>/gi, ''); // 移除首页广告
body = body.replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi, ''); // 搜索结果广告
body = body.replace(/<span[^>]*>广告<\/span>/gi, ''); // 移除广告文字
body = body.replace(/"isAd":true,[^}]*}/gi, ''); // 去除广告标记
body = body.replace(/"ad_type":\d+,[^}]*}/gi, ''); // 移除广告类型标记

// 清理百度统计和推送脚本
body = body.replace(/<script[^>]+hm\.baidu\.com[^<]+<\/script>/gi, ''); // 移除百度统计
body = body.replace(/<script[^>]+push\.zhanzhang\.baidu\.com[^<]+<\/script>/gi, ''); // 移除百度推送

// 插入CSS和JS，阻止其他广告加载
body = body.replace(/<\/title>/gi, '</title>\
<link rel="stylesheet" href="https://limbopro.com/CSS/Adblock4limbo.user.css" type="text/css" />\
<script type="text/javascript" async="async" src="https://limbopro.com/Adguard/Adblock4limbo.user.js"></script>\
');

// 返回修改后的响应体
$done({ body });