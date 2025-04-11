// ==UserScript==
// @name         百度推广广告精准屏蔽
// @match        *://*.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  // 删除 ID 或 class 标识为广告推广的搜索结果（精准广告模块）
  body = body.replace(/<div[^>]+id="(\d+)"[^>]*data-is-mainline="false"[^>]*>([\s\S]*?)<\/div>/gi, '');

  // 删除含 "data-tuiguang" 或 class 中含 "ec_" 的模块（百度广告标识）
  body = body.replace(/<div[^>]+data-tuiguang[^>]*>[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<div[^>]+class="[^"]*ec_[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // 删除包含 “广告” / “商业推广” 标识的小标签，仅限广告标识，不影响正常文字
  body = body.replace(/<span[^>]*>(广告|商业推广)<\/span>/gi, '');

  $done({ body });
} else {
  $done({});
}