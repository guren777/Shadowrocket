// 远程白名单规则集 URL
const whitelistUrl = "https://raw.githubusercontent.com/guren777/Shadowrocket/refs/heads/main/NetworkFirewall-Whitelist.list";

// 本地存储键值
const appStatusKey = "App_Status"; // 存储当前应用状态（foreground/background）
const whitelistKey = "Whitelist_Domains"; // 存储本地白名单规则

// 通知开关配置
const enableAppOpenNotification = true;  // 启用/禁用应用打开的通知
const enableAppCloseNotification = true; // 启用/禁用应用关闭的通知
const enableWhitelistUpdateNotification = true; // 启用/禁用白名单更新的通知
const enableRequestPassNotification = false; // 启用/禁用请求放行的通知
const enableRequestBlockNotification = true; // 启用/禁用请求拦截的通知
const enableErrorNotification = true; // 启用/禁用错误通知

// ** 网络状态检测函数 **
async function getNetworkStatus() {
    const network = $network;
    console.log(`网络状态详情：${JSON.stringify(network)}`);

    if (network && network.v4 && network.v4.primaryAddress) {
        if (network.wifi) return "Wi-Fi连接";
        if (network.cellular) return "蜂窝网络连接";
    }

    // 备用逻辑：通过 HTTP 请求测试网络连接
    try {
        const testUrl = "https://www.google.com";
        const result = await new Promise((resolve) => {
            $httpClient.get(testUrl, (err, resp) => {
                resolve(!err && resp.status === 200 ? "已连接" : "无网络连接");
            });
        });
        return result === "已连接" ? "未知网络连接" : "无网络连接";
    } catch (e) {
        return "无网络连接";
    }
}

// ** 白名单更新函数 **
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

        // 解析域名列表，忽略空行和注释行
        const domains = response
            .split("\n")                     // 按行分割
            .map(line => line.trim())        // 去除行首尾空白字符
            .filter(line => line && !line.startsWith("#")); // 过滤空行和注释行

        console.log(`远程白名单更新成功：${domains.length} 条规则`);
        return domains;
    } catch (err) {
        console.log(`获取远程白名单失败：${err}`);
        if (enableErrorNotification) {
            $notification.post("白名单更新失败", err.message || "无法获取远程白名单", "请检查网络或 URL 配置");
        }
        throw new Error("无法更新白名单，请检查网络或 URL 配置");
    }
}

// ** 主逻辑 **
(async () => {
    try {
        // 检测当前网络状态
        const networkStatus = await getNetworkStatus();
        console.log(`当前联网状态：${networkStatus}`);

        // 如果非 HTTP 请求触发（如脚本手动运行或应用状态变化）
        if (typeof $request === "undefined") {
            if (typeof $trigger !== "undefined" && $trigger === "app_open") {
                $persistentStore.write("foreground", appStatusKey);
                console.log("应用切换到前台，放行所有请求");
                if (enableAppOpenNotification) {
                    $notification.post("应用状态", "前台模式已启用", "所有请求已放行");
                }
            } else if (typeof $trigger !== "undefined" && $trigger === "app_close") {
                $persistentStore.write("background", appStatusKey);
                console.log("应用切换到后台，拦截非白名单请求");
                if (enableAppCloseNotification) {
                    $notification.post("应用状态", "后台模式已启用", "非白名单请求将被拦截");
                }
            } else {
                console.log("手动运行脚本，无操作");
            }
            $done();
            return;
        }

        // 处理 HTTP 请求
        const currentState = $persistentStore.read(appStatusKey) || "background";
        console.log(`当前状态：${currentState}`);

        // 如果是前台模式，直接放行
        if (currentState === "foreground") {
            console.log(`前台模式，放行请求：${$request.url}`);
            if (enableRequestPassNotification) {
                $notification.post("请求放行", `前台模式，放行请求：${$request.url}`, "");
            }
            $done({});
            return;
        }

        // 如果是后台模式，检查白名单
        let whitelist = JSON.parse($persistentStore.read(whitelistKey) || "[]");
        if (whitelist.length === 0) {
            whitelist = await fetchWhitelist();
            $persistentStore.write(JSON.stringify(whitelist), whitelistKey);
            console.log("白名单已更新");
            if (enableWhitelistUpdateNotification) {
                $notification.post("白名单更新", "远程白名单已更新", `${whitelist.length} 条规则`);
            }
        }

        // 检查 URL 是否在白名单中
        const isWhitelisted = whitelist.some(domain => $request.url.includes(domain));
        console.log(`白名单匹配结果：${isWhitelisted}`);
        console.log(`处理请求：${$request.url}`);

        if (isWhitelisted) {
            console.log(`后台模式，白名单请求放行：${$request.url}`);
            if (enableRequestPassNotification) {
                $notification.post("请求放行", `后台模式，白名单请求放行：${$request.url}`, "");
            }
            $done({});
        } else {
            console.log(`后台模式，拦截请求：${$request.url}`);
            if (enableRequestBlockNotification) {
                $notification.post("请求拦截", `后台模式，拦截请求：${$request.url}`, "该请求不在白名单中");
            }
            $done({ response: { status: 403, body: "Blocked by AppStatusControl" } });
        }
    } catch (err) {
        console.log(`脚本错误：${err}`);
        if (enableErrorNotification) {
            $notification.post("AppStatusControl 脚本错误", err.message || "未知错误", "请检查脚本配置");
        }
        $done({ response: { status: 500, body: "Error in AppStatusControl script" } });
    }
})();