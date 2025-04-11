// ==UserScript==
// @name         百度推广广告精准屏蔽（优化版）
// @match        *://*.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  const debug = false;

  // 精准匹配广告关键词
  const adKeywords = ['广告', '廣告', '推广', '推廣', '商业推广', '商业廣告', 'sponsored', 'promoted'];
  const adSpanRegex = new RegExp(`<span[^>]*>(${adKeywords.join('|')})<\\/span>`, 'gi');
  body = body.replace(adSpanRegex, '');

  // 删除 ID/class/data-tuiguang 形式的广告模块
  body = body.replace(/<div[^>]+id="(\d+)"[^>]*data-is-mainline="false"[^>]*>[\s\S]{0,3000}?<\/div>/gi, '');
  body = body.replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]{0,3000}?<\/div>/gi, '');
  body = body.replace(/<div[^>]+class="[^"]*ec_[^"]*"[^>]*>[\s\S]{0,3000}?<\/div>/gi, '');

  // 删除 JSON 脚本中包含广告词的内容
  body = body.replace(/<script[^>]+type="application\/json"[^>]*>[\s\S]*?(广告|cpro|tuiguang)[\s\S]*?<\/script>/gi, '');

  if (debug) console.log('百度广告屏蔽完成');

  $done({ body });
} else {
  $done({});
}