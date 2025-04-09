// ==Script==
// @name         百度搜索广告净化
// @description  过滤百度搜索页中“广告”与“商业推广”模块
// @match        https://www.baidu.com/s*
// ==/Script==

let body = $response.body;

if (body) {
  try {
    // 过滤广告模块：带有“广告”、“商业推广”关键字的 DOM 节点
    body = body.replace(/<div[^>]*class="[^"]*?result[^"]*?"[^>]*?>[\s\S]*?(广告|商业推广)[\s\S]*?<\/div>/g, '');

    // 删除 hint 类提示
    body = body.replace(/<div[^>]*class="hint_common_restop"[^>]*>[\s\S]*?<\/div>/g, '');

    // 可选：替换广告提示为用户说明
    body = body.replace(
      /(<span[^>]*class="nums"[^>]*>.*?)(<\/span>)/,
      '$1，已为您屏蔽百度广告<span style="color:red;">(已净化)</span>$2'
    );

    $done({ body });
  } catch (e) {
    console.log('百度净化失败:', e);
    $done({});
  }
} else {
  $done({});
}