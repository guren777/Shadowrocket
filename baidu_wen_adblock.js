// ==UserScript==
// @name         百度问一问广告屏蔽
// @match        *://wen.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    const keywords = [
      '广告'
    ];

    const injectScript = `
<script>
(function () {
  const keywords = ${JSON.stringify(keywords)};
  const classPattern = /recommend|jingcai|tuijian|guess|related/i;

  function removeAds() {
    const elements = document.querySelectorAll('div, section, article');
    elements.forEach(el => {
      const text = el.innerText || '';
      const html = el.innerHTML || '';
      const cls = el.className || '';
      const style = getComputedStyle(el);

      // 命中关键词且内容区域小于一定高度（非主要回答区域）
      if (keywords.some(k => text.includes(k)) && el.clientHeight < 500) {
        el.remove();
        return;
      }

      // 浮动广告遮罩（遮挡页面的 APP 打开、推荐弹窗等）
      if (
        style.position === 'fixed' &&
        parseInt(style.zIndex) > 999 &&
        el.clientHeight > window.innerHeight * 0.4
      ) {
        el.remove();
        return;
      }

      // 推荐类 class 样式
      if (classPattern.test(cls)) {
        el.style.display = 'none';
      }
    });
  }

  // 初始加载处理
  document.addEventListener('DOMContentLoaded', removeAds);
  window.addEventListener('load', () => {
    removeAds();
    let i = 0;
    const timer = setInterval(() => {
      removeAds();
      if (++i >= 8) clearInterval(timer);
    }, 600);
  });

  // DOM 变动观察器
  const observer = new MutationObserver(removeAds);
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