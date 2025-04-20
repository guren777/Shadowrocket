// ==UserScript==
// @name         百度贴吧广告屏蔽（优化版）
// @match        *://tieba.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    const keywords = [
      '相关推荐', '热门推荐', '下载百度贴吧APP', 'APP内查看', '继续访问', '立即体验'
    ];

    const injectScript = `
<script>
(function () {
  const keywords = ${JSON.stringify(keywords)};

  function cleanPage() {
    // 移除广告和推荐信息
    document.querySelectorAll('div, section, article').forEach(el => {
      const text = el.textContent || '';
      const html = el.innerHTML || '';
      const cls = el.className || '';
      const style = getComputedStyle(el);

      // 精准关键词匹配（避免误杀正常内容）
      const hitKeyword = keywords.some(k => text.includes(k));

      // 移除小于1000px高度的推荐内容
      if (hitKeyword && el.clientHeight < 1000) {
        el.remove();
        return;
      }

      // 处理弹窗遮罩类广告（通过 position 和 z-index 判断）
      if (style.position === 'fixed') {
        const isCover = el.clientHeight >= window.innerHeight * 0.4 && parseInt(style.zIndex) > 999;
        const hasContent = text.trim() || html.trim();

        if ((hitKeyword && hasContent) || isCover) {
          el.remove();
        }
      }

      // 隐藏包含"推荐"、"精彩"等字样的元素
      if (/recommend|jingcai|tuijian|guess|related/i.test(cls)) {
        el.style.display = 'none';
      }
    });

    // 屏蔽底部、顶部、浮动广告遮罩
    const popups = document.querySelectorAll('.pop-up, .floating, .fixed, .mask');
    popups.forEach(popup => popup.remove());
  }

  // 页面加载完成后清除广告
  document.addEventListener('DOMContentLoaded', cleanPage);
  window.addEventListener('load', () => {
    cleanPage();
  });

  // 使用 MutationObserver 动态监测并清除新增的广告
  const observer = new MutationObserver(cleanPage);
  observer.observe(document.body, { childList: true, subtree: true });

})();
</script>`;

    // 在 body 的结束标签之前插入广告屏蔽脚本
    body = body.replace(/<\/body>/i, injectScript + '</body>');
    $done({ body });

  } catch (e) {
    $done({});
  }
} else {
  $done({});
}