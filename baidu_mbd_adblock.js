// ==UserScript==
// @name         百度web广告屏蔽
// @match        *://mbd.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    const popupKeywords = [
   '打开百度APP', '百度APP内打开', '打开百度APP，阅读完整内容', 
   '大家还在搜', '广告'
    ];

    const recommendKeywords = [
   '广告', '相关推荐', '精彩推荐', '百度热榜', '大家还在搜',
   '百度APP内阅读','百度APP内播放',
   '页面内容由第三方提供，仅供参考'
    ];

    const injectScript = `
<script>
(function () {
  const popupKeywords = ${JSON.stringify(popupKeywords)};
  const recommendKeywords = ${JSON.stringify(recommendKeywords)};

  function cleanPage() {
    const divs = document.querySelectorAll('div, section, article');
    divs.forEach(div => {
      const html = div.innerHTML || '';
      const text = div.innerText || '';
      const cls = div.className || '';
      const style = getComputedStyle(div);

      // —— 弹窗屏蔽逻辑 ——
      if (
        style.position === 'fixed' &&
        (text.trim().length > 0 || html.trim().length > 0) &&
        popupKeywords.some(k => html.includes(k) || text.includes(k))
      ) {
        div.remove();
      }

      // 删除高 z-index 的遮罩层
      if (
        style.position === 'fixed' &&
        div.clientHeight >= window.innerHeight * 0.5 &&
        (text.trim() === '' && html.trim() === '') &&
        parseInt(style.zIndex) > 1000
      ) {
        div.remove();
      }

      // —— 推荐内容屏蔽逻辑 ——
      if (recommendKeywords.some(k => html.includes(k) || text.includes(k))) {
        if (div.clientHeight < 1000) {
          div.style.display = 'none';
        }
      }

      if (/.*recommend.*|.*jingcai.*|.*tuijian.*|.*guess.*|.*related.*/i.test(cls)) {
        div.style.display = 'none';
      }
    });

    // 恢复滚动
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  document.addEventListener('DOMContentLoaded', cleanPage);
  window.addEventListener('load', () => {
    cleanPage();
    let i = 0;
    const timer = setInterval(() => {
      cleanPage();
      if (++i >= 10) clearInterval(timer);
    }, 1000);
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