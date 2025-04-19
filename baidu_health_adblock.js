// ==UserScript==
// @name         百度health广告屏蔽
// @match        *://health.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    const keywords = [
     '大家还在搜', '百度热榜','页面内容由第三方提供，仅供参考',
     '广告', '百度健康内容支持'
     
    ];

    const injectScript = `
<script>
(function () {
  const keywords = ${JSON.stringify(keywords)};

  function cleanPage() {
    document.querySelectorAll('div, section, article').forEach(el => {
      const text = el.textContent || '';
      const html = el.innerHTML || '';
      const cls = el.className || '';
      const style = getComputedStyle(el);

      // 精准关键词匹配（避免误杀正常内容）
      const hitKeyword = keywords.some(k => text.includes(k));

      if (hitKeyword && el.clientHeight < 1000) {
        el.remove();
        return;
      }

      // 特殊处理弹窗遮罩类广告
      if (style.position === 'fixed') {
        const isCover = el.clientHeight >= window.innerHeight * 0.4 && parseInt(style.zIndex) > 999;
        const hasContent = text.trim() || html.trim();

        if ((hitKeyword && hasContent) || isCover) {
          el.remove();
        }
      }

      // class 中带有明显推荐字样的直接隐藏
      if (/recommend|jingcai|tuijian|guess|related/i.test(cls)) {
        el.style.display = 'none';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', cleanPage);
  window.addEventListener('load', () => {
    cleanPage();
    let i = 0;
    const timer = setInterval(() => {
      cleanPage();
      if (++i >= 8) clearInterval(timer);
    }, 800);
  });

  const observer = new MutationObserver(cleanPage);
  observer.observe(document.body, { childList: true, subtree: true });
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