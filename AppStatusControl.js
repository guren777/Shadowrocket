// 脚本名称：AppStatusControl.js

// 远程白名单规则集 URL
const whitelistUrl = "https://your-server.com/whitelist.txt";

// 本地存储键值
const appStatusKey = "App_Status"; // 存储当前应用状态（foreground/background）
const whitelistKey = "Whitelist_Domains"; // 存储本地白名单规则

// 检查当前是否通过 HTTP 请求触发
if (typeof $request === "undefined") {
    // 非 HTTP 请求环境（可能是手动运行脚本）
    if (typeof $trigger !== "undefined" && $trigger === "app_open") {
        // 应用切换到前台，更新状态
        $persistentStore.write("foreground", appStatusKey);
        console.log("应用切换到前台，放行所有请求");
        $notification.post("应用状态", "前台模式已启用", "所有请求已放行");
    } else if (typeof $trigger !== "undefined" && $trigger === "app_close") {
        // 应用切换到后台，更新状态
        $persistentStore.write("background", appStatusKey);
        console.log("应用切换到后台，拦截非白名单请求");
        $notification.post("应用状态", "后台模式已启用", "非白名单请求将被拦截");
    } else {
        console.log("手动运行脚本，无操作");
    }
    $done();
} else {
    // HTTP 请求处理逻辑
    (async () => {
        try {
            // 获取当前状态
            const currentState = $persistentStore.read(appStatusKey) || "background";

            // 如果是前台模式，直接放行
            if (currentState === "foreground") {
                console.log(`前台模式，放行请求：${$request.url}`);
                $done({});
                return;
            }

            // 如果是后台模式，检查白名单
            let whitelist = JSON.parse($persistentStore.read(whitelistKey) || "[]");
            if (whitelist.length === 0) {
                // 如果本地没有白名单，则下载更新
                whitelist = await fetchWhitelist();
                $persistentStore.write(JSON.stringify(whitelist), whitelistKey);
                console.log("白名单已更新");
            }

            // 检查 URL 是否在白名单中
            const isWhitelisted = whitelist.some(domain => $request.url.includes(domain));
            if (isWhitelisted) {
                console.log(`后台模式，白名单请求放行：${$request.url}`);
                $done({});
            } else {
                console.log(`后台模式，拦截请求：${$request.url}`);
                $done({ response: { status: 403, body: "Blocked by AppStatusControl" } });
            }
        } catch (err) {
            console.log(`脚本错误：${err}`);
            $notification.post("AppStatusControl 脚本错误", err.message || "未知错误", "请检查脚本配置");
            $done({ response: { status: 500, body: "Error in AppStatusControl script" } });
        }
    })();
}

// 远程白名单更新函数
async function fetchWhitelist() {
    try {
        const response = await new Promise((resolve, reject) => {
            $httpClient.get(whitelistUrl, (err, resp, data) => {
                if (err || resp.status !== 200) {
                    reject(err || new Error(`HTTP ${resp.status}`));
                } else {
                    resolve(data);
                }
            });
        });

        // 解析域名列表
        const domains = response.split("\n").map(line => line.trim()).filter(line => line && !line.startsWith("#"));
        console.log(`远程白名单更新成功：${domains.length} 条规则`);
        return domains;
    } catch (err) {
        console.log(`获取远程白名单失败：${err}`);
        throw new Error("无法更新白名单，请检查网络或 URL 配置");
    }
}