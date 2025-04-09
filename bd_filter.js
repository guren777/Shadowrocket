// ==UserScript==
// @name         Baidu AdBlocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block Baidu Ads in Shadowrocket
// @author       You
// @match        *://*.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 需要屏蔽的广告请求的 URL 和资源
    const blockedUrls = [
        /baidu\.com\/.*(ads|promo|track|monitor|cpro|ssp|adlog|adservice|adx|fex|log|hm|vstat|cb|baijiahao)\b.*$/,
        /baidu\.com\/.*\.(jpg|png|gif|js|css|html|json|mp4)$/,
        /baidustatic\.com\/.*\.(js|css|gif|jpg|png|mp4|html|json)$/,
    ];

    // 检查请求的 URL 是否属于广告或追踪请求
    function isBlockedRequest(url) {
        return blockedUrls.some(pattern => pattern.test(url));
    }

    // 拦截请求并阻止广告
    function interceptRequest(request) {
        if (isBlockedRequest(request.url)) {
            request.abort();  // 拒绝加载广告资源
        } else {
            request.continue();  // 正常加载非广告资源
        }
    }

    // 拦截页面的加载请求
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (isBlockedRequest(url)) {
            return Promise.resolve(new Response(null, { status: 403 }));  // 直接返回 403 错误
        }
        return originalFetch(url, options);
    };

    // 捕获 XMLHttpRequest 并拦截广告请求
    const originalXMLHttpRequestOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (isBlockedRequest(url)) {
            return;  // 阻止广告请求
        }
        return originalXMLHttpRequestOpen.apply(this, arguments);
    };

    // 执行广告屏蔽
    function blockAds() {
        const adElements = document.querySelectorAll('div, span, a, img');
        adElements.forEach(element => {
            if (element.innerHTML && (element.innerHTML.includes('广告') || element.innerHTML.includes('商业推广'))) {
                element.style.display = 'none';  // 隐藏广告元素
            }
        });
    }

    // 每隔一段时间刷新页面的广告屏蔽
    setInterval(blockAds, 1000);
})();
