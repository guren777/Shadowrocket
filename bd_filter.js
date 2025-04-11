// ==UserScript==
// @name         Baidu AdBlocker Full (with URL Interception)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Block Baidu ads via URL interception and DOM cleanup (Like Adblock4limbo.js logic)
// @author       GPT
// @match        *://*.baidu.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 拦截广告资源的 URL 关键词正则列表
    const blockedUrlPatterns = [
        /cpro\.baidu\.com/,
        /pos\.baidu\.com/,
        /hm\.baidu\.com/,
        /log.*\.baidu\.com/,
        /track/,
        /ssp\.baidu\.com/,
        /adservice/,
        /adx/,
        /cb\.baidu\.com/,
        /baidustatic\.com\/.*(cpro|ads|log|hm)/,
        /push\.zhanzhang\.baidu\.com/,
        /monitor/,
    ];

    // 判断请求 URL 是否为广告
    function isBlockedUrl(url) {
        return blockedUrlPatterns.some(pattern => pattern.test(url));
    }

    // 拦截 fetch 请求
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : input.url;
        if (isBlockedUrl(url)) {
            console.warn('[AdBlocker] blocked fetch:', url);
            return Promise.resolve(new Response(null, { status: 403, statusText: 'Blocked by AdBlocker' }));
        }
        return originalFetch.apply(this, arguments);
    };

    // 拦截 XMLHttpRequest 请求
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
        if (isBlockedUrl(url)) {
            console.warn('[AdBlocker] blocked xhr:', url);
            this.abort(); // 主动终止请求
            return;
        }
        return originalXHROpen.call(this, method, url, ...args);
    };

    // 广告关键词
    const adKeywords = ['广告', '商业推广', '百度推广', '品牌广告'];

    // 检查元素是否包含广告文字
    function isAdElement(el) {
        const text = el.textContent || '';
        return adKeywords.some(kw => text.includes(kw));
    }

    // 清理页面广告元素
    function cleanAdElements() {
        const adSelectors = [
            '[data-tuiguang]',
            '.ec-pc-trust',
            '.result-op',
            '.ad-block',
            '.ec-ad',
            '.adsbygoogle',
            '#content_left > div',
        ];
        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (isAdElement(el)) {
                    el.remove();
                }
            });
        });
    }

    // 初始执行清理
    cleanAdElements();

    // 监听 DOM 变化进行动态广告清理
    const observer = new MutationObserver(cleanAdElements);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();