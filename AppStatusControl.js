// 读取当前状态
const currentState = $persistentStore.read("App_Status") || "background";

// 定义白名单域名（可以根据需求调整）
const whitelist = ["example.com", "apple.com"];

// 通知函数
function notify(title, message) {
    $notification.post(title, "", message);
}

// 检测当前触发事件
if ($trigger === "app-launch") {
    // 更新状态为前台
    $persistentStore.write("foreground", "App_Status");

    // 提示通知
    notify("网络已放行", "当前应用处于前台状态，允许所有请求");

    // 动态规则调整：允许白名单域名
    whitelist.forEach((domain) => {
        $rule.add({
            domain: domain,
            action: "allow",
        });
    });

    console.log("应用切换到前台，网络已放行");
} else if ($trigger === "app-background") {
    // 更新状态为后台
    $persistentStore.write("background", "App_Status");

    // 提示通知
    notify("网络已拦截", "当前应用处于后台状态，所有请求已被拦截");

    // 动态规则调整：拦截非白名单域名
    $rule.add({
        domain: "*",
        action: "block",
    });

    console.log("应用切换到后台，网络已拦截");
}

$done();