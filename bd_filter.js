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
  // 给 data-tuiguang 的广告添加隐藏样式
  body = body.replace(/(<div[^>]+data-tuiguang[^>]*)(>)/gi, '$1 style="display:none!important;"$2');

  // 隐藏 class 包含 ec-ad、ec-pc-trust、result-op 的模块
  body = body.replace(/(<div[^>]+class="[^"]*(ec-ad|ec-pc-trust|result-op)[^"]*"[^>]*)(>)/gi, '$1 style="display:none!important;"$3');

  // 隐藏百度知道广告模块
  body = body.replace(/(<div[^>]+class="zhidao_ad[^"]*"[^>]*)(>)/gi, '$1 style="display:none!important;"$2');

  // 隐藏广告关键词（但保留结构）
  body = body.replace(/(<span[^>]*?>)(广告|商业推广|百度推广)(<\/span>)/gi, '$1$3');

  // 移除统计/推送脚本（不影响布局）
  body = body.replace(/<script[^>]*?(hm|zhanzhang)\.baidu\.com[^<]*?<\/script>/gi, '');
}

// 返回处理后的内容
$done({ body });