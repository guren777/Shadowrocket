// ==Script==
// @name         Shadowrocket - Baidu AdBlock (Safe UI)
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
  // 隐藏带有 data-tuiguang 的广告元素
  body = body.replace(/(<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 隐藏带有 ec-ad、ec-pc-trust、result-op 类的广告模块
  body = body.replace(/(<div[^>]+class="[^"]*(ec-ad|ec-pc-trust|result-op)[^"]*"[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 隐藏百度知道页面的广告模块
  body = body.replace(/(<div[^>]+class="zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 隐藏包含广告关键词（如广告、推广等）的广告模块
  body = body.replace(/(<div[^>]*class="[^"]*adsbygoogle[^"]*"[^>]*>[\s\S]*?<\/div>)/gi, '<div style="display:none!important;">$1</div>');

  // 移除百度的统计和推送脚本
  body = body.replace(/<script[^>]*?(hm|zhanzhang)\.baidu\.com[^<]*?<\/script>/gi, '');
}

// 返回处理后的内容
$done({ body });