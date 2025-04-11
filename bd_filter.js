// ==Script==
// @name         Shadowrocket - Baidu AdBlock (Hide Full Ad Entry)
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

// 保证只处理文本响应
if (!body || typeof body !== 'string') {
  $done({});
  return;
}

// 对 HTML 页面隐藏广告，而不是删除 DOM
if (body.includes('<html') || body.includes('<!DOCTYPE html')) {

  // 1. 匹配并隐藏包含广告、推广、百度推广等关键词的完整广告条目
  body = body.replace(/(<div[^>]+>[\s\S]*?(广告|商业推广|百度推广)[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 2. 隐藏带有 'data-tuiguang' 属性的广告模块
  body = body.replace(/(<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 3. 隐藏包含广告标识的元素，如 'ec-ad', 'ec-pc-trust', 'result-op', 'adsbygoogle'
  body = body.replace(/(<div[^>]+class="[^"]*(ec-ad|ec-pc-trust|result-op|adsbygoogle)[^"]*"[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 4. 隐藏百度知道页面的广告模块
  body = body.replace(/(<div[^>]+class="zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 5. 移除百度统计和推送脚本
  body = body.replace(/<script[^>]*?(hm|zhanzhang)\.baidu\.com[^<]*?<\/script>/gi, '');
}

// 返回处理后的内容
$done({ body });