// ==UserScript==
// @name         百度搜索推广广告屏蔽
// @match        *://*.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  // 替换带有“推广”、“广告”关键词的 div，防止它们显示
  body = body.replace(/<div[^>]*?>(.*?)?(推广|商业推广|广告)(.*?)?<\/div>/gi, match => {
    return `<div style="display:none!important;">${match}</div>`;
  });

  // 移除特定 class 的推广模块
  const adClasses = ['ec_ad_results', 'ec_wise_ad', 'ad-block', 'result-op', 'ec-pc-trust', 'c-container-op'];
  adClasses.forEach(cls => {
    const regex = new RegExp(`<div[^>]+class="[^"]*${cls}[^"]*"[^>]*>[\\s\\S]*?<\\/div>`, 'gi');
    body = body.replace(regex, match => `<div style="display:none!important;">${match}</div>`);
  });

  // 特定标识广告 JSON 内容（部分页面通过 script 注入）
  body = body.replace(/<script[^>]+>[\s\S]*?(广告|cpro|guanggao)[\s\S]*?<\/script>/gi, '');

  $done({ body });
} else {
  $done({});
}