// ==Script==
// @name           Baidu Ad Cleaner
// @match          ^https?:\/\/(www|m)\.baidu\.com\/s.*
// @script-type    http-response
// ==/Script==

if ($response.body) {
  let body = $response.body;

  try {
    // 删除包含“广告”、“商业推广”的相关 HTML 块
    body = body.replace(/<div[^>]+data-tuiguang[^>]*>.*?<\/div>/gs, '');
    body = body.replace(/<div[^>]+id=".*?ad.*?"[^>]*>.*?<\/div>/gs, '');
    body = body.replace(/<span[^>]*>广告<\/span>/g, '');
    body = body.replace(/<div[^>]+class=".*?ec_ad_results.*?"[^>]*>.*?<\/div>/gs, '');
    body = body.replace(/<div[^>]+data-adid[^>]*>.*?<\/div>/gs, '');

    $done({ body });
  } catch (e) {
    console.log("百度广告清理脚本错误: ", e);
    $done({});
  }
} else {
  $done({});
}