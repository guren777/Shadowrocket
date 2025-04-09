// ==Script==
// @name         百度搜索广告净化 v2
// @description  精准移除百度搜索广告结果，避免误伤正常内容
// @match        https://www.baidu.com/s*
// ==/Script==

let body = $response.body;

if (body) {
  try {
    // 精确匹配常见广告 div（百度推广、广告标记）
    const adPattern = /<div[^>]+id="(\d{5,})"[^>]*?>[\s\S]*?(广告|商业推广)[\s\S]*?<\/div>/g;
    body = body.replace(adPattern, '');

    // 可选：移除百度底部提示条中的推广信息
    const hintPattern = /<div[^>]+class="hint_common_restop"[^>]*>[\s\S]*?<\/div>/g;
    body = body.replace(hintPattern, '');

    // 可选：在顶部添加提示文字（如你希望用户看到广告被净化了）
    body = body.replace(
      /(<span[^>]*class="nums"[^>]*>.*?)(<\/span>)/,
      '$1，已为您智能屏蔽推广结果$2'
    );

    $done({ body });
  } catch (e) {
    console.log('处理出错:', e);
    $done({});
  }
} else {
  $done({});
}