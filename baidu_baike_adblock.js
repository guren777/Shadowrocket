// ==UserScript==
// @name         百度百科广告屏蔽优化版（不干扰视频）
// @match        *://baike.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    const keywords = ['广告', '相关星图', '声明'];  // 可扩展关键词

    const injectScript = `
<script>
(function () {
  const keywords = ${JSON.stringify(keywords)};

  function cleanPage() {
    document.querySelectorAll('div, section, article').forEach(el => {
      // 如果包含视频或 iframe，直接跳过
      if (el.querySelector('video, iframe')) return;

      const text = el.textContent || '';
      const cls = el.className || '';
      const style = getComputedStyle(el);

      const hit = keywords.some(k => text.includes(k));
      const isFixedCover = style.position === 'fixed' &&
                           el.clientHeight > window.innerHeight * 0.4 &&
                           parseInt(style.zIndex || 0) > 999;

      // 条件移除
      if ((hit && el.clientHeight < 600) || isFixedCover) {
        el.remove();
        return;
      }

      if (/recommend|jingcai|tuijian|guess|related/i.test(cls)) {
        el.remove();
      }
    });
  }

  function startCleaning() {
    cleanPage();
    let count = 0;
    const timer = setInterval(() => {
      cleanPage();
      if (++count > 6) clearInterval(timer);
    }, 800);
  }

  document.addEventListener('DOMContentLoaded', startCleaning);
  window.addEventListener('load', startCleaning);

  new MutationObserver(cleanPage).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>`;

    body = body.replace(/<\/body>/i, injectScript + '</body>');
    $done({ body });
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}