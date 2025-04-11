// ==Script==
// @name         Shadowrocket - Baidu Precise AdBlock
// @match        *://*.baidu.com/*
// ==/Script==

let body = $response.body;

// 保证只处理 HTML/JSON 内容
if (!body || typeof body !== 'string') {
  $done({});
  return;
}

// 判断 HTML 页面
if (body.includes('<html') || body.includes('<!DOCTYPE html')) {
  // 删除包含“data-tuiguang”属性的推广结果
  body = body.replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi, '');

  // 删除 class 含广告标识的块（不删除主要搜索容器）
  body = body.replace(/<div[^>]+class="[^"]*(ec-ad|ec-pc-trust|result-op)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // 删除百度知道广告模块（顶部/底部的 ad-container）
  body = body.replace(/<div[^>]+class="zhidao_ad[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // 删除百度统计、站长推送等脚本
  body = body.replace(/<script[^>]*?(hm|zhanzhang)\.baidu\.com[^<]*?<\/script>/gi, '');
}

// 判断 JSON 类型响应（如搜索结果接口）
if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
  try {
    const json = JSON.parse(body);

    // 针对常见广告字段进行清除（如广告数组、isAd 标志等）
    function deepClean(obj) {
      if (Array.isArray(obj)) {
        return obj.filter(item => !(item && (item.isAd || item.ad_type || item.cm_ext || item.tpl_conf)));
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (
            key.toLowerCase().includes('ad') ||
            key === 'cm_ext' || key === 'adData' || key === 'ad_info'
          ) {
            delete obj[key];
          } else {
            obj[key] = deepClean(obj[key]);
          }
        }
      }
      return obj;
    }

    const cleaned = deepClean(json);
    body = JSON.stringify(cleaned);
  } catch (e) {
    // 非标准 JSON，跳过处理
  }
}

// 返回干净的响应体
$done({ body });
