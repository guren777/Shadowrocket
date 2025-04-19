// ==UserScript==
// @name         百度web广告屏蔽
// @match        *://*.baidu.com/*
// ==/UserScript==

let body = $response.body;

if (body && typeof body === 'string') {
  try {
    
    // 正则转义函数（可用于动态关键词）
    function escapeReg(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 精准隐藏主线广告
    body = body.replace(/<div[^>]+id="\d+"[^>]*data-is-mainline="false"[^>]*>/gi, match => {
      return match.includes('style=')
        ? match.replace(/style=["'][^"']*["']/, s => s.replace(/["']$/, ';display:none!important$&'))
        : match.replace(/>$/, ' style="display:none!important">');
    });

    // 隐藏 data-tuiguang 推广模块
    body = body.replace(/<div[^>]+data-tuiguang[^>]*>/gi, match => {
      return match.includes('style=')
        ? match.replace(/style=["'][^"']*["']/, s => s.replace(/["']$/, ';display:none!important$&'))
        : match.replace(/>$/, ' style="display:none!important">');
    });

    // 隐藏 ec_ 系列广告模块
    body = body.replace(/<div[^>]+class="[^"]*ec_[^"]*"[^>]*>/gi, match => {
      return match.includes('style=')
        ? match.replace(/style=["'][^"']*["']/, s => s.replace(/["']$/, ';display:none!important$&'))
        : match.replace(/>$/, ' style="display:none!important">');
    });

    // 删除“关键词”标记文字
    body = body.replace(/<span[^>]*>(广告|商业推广)<\/span>/gi, '');

    // 屏蔽搜索结果项的站点
    const blockedSites = [
     'shopping.baidu.com',
     'b2b.baidu.com', 
     'health.baidu.com'
    ];  // 可扩展站点列表

    const keywords = [
     '百度爱采购','爱采购',
     '百度健康','百度健康商城',
     '百度入手榜',
     '页面内容由第三方提供，仅供参考'
    ];  // 可扩展关键词列表

    const injectDomCleaner = `
    <script>
    (function() {
      const keywords = ${JSON.stringify(keywords)}; // 可扩展关键词
      // 精准屏蔽站点的搜索结果项
      const blockedSites = ${JSON.stringify(blockedSites)};  // 可扩展站点

      function removeAds() {
        // 遍历所有链接，屏蔽匹配站点的搜索结果项
        document.querySelectorAll('a').forEach(a => {
          const href = a.href || '';
          blockedSites.forEach(site => {
            if (href.includes(site)) {
              const container = a.closest('.result, .c-container, .result-op');
              if (container) {
                container.style.display = 'none';  // 直接隐藏，无需判断高度
              }
            }
          });
        });

        // 遍历所有容器，检查其 HTML 中是否包含广告域名（即便没有链接标签）
        document.querySelectorAll('.result, .c-container, .result-op').forEach(container => {
          const html = container.innerHTML || '';
          let matched = false;

          // 链接中包含广告域名
          const links = container.querySelectorAll('a');
          links.forEach(link => {
            const href = link.href || '';
            if (blockedSites.some(site => href.includes(site))) {
              matched = true;
            }
          });

          // 容器内部 HTML 中包含广告域名（即使没有 <a> 标签）
          if (!matched && blockedSites.some(site => html.includes(site))) {
            matched = true;
          }

          if (matched) {
            container.style.display = 'none';
          }
        });

        // 关键词过滤其他类型广告内容
        document.querySelectorAll('div').forEach(div => {
          const text = div.innerText || '';
          const html = div.innerHTML || '';
          const style = getComputedStyle(div);

          // 关键词命中
          if (keywords.some(k => text.includes(k))) {
            if (div.clientHeight < 600) div.style.display = 'none';
          }

          // 浮动广告
          if (style.position === 'fixed' && div.clientHeight < 600) {
            if ((text.trim().length > 0 || html.trim().length > 0)) {
              div.style.display = 'none';
            }
          }
        });
      }

      // 等待页面完全加载，延迟执行广告清除
      document.addEventListener('DOMContentLoaded', () => setTimeout(removeAds, 500));  // 延时执行，确保页面完全加载
      window.addEventListener('load', () => setTimeout(removeAds, 500));

      // 监听 DOM 变化以处理动态广告
      const observer = new MutationObserver(removeAds);
      observer.observe(document.body, { childList: true, subtree: true });
    })();
    </script>`;

    // 注入脚本到页面尾部
    body = body.replace(/<\/body>/i, injectDomCleaner + '</body>');
    $done({ body });
    
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}