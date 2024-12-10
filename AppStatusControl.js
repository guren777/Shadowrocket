// 当前状态（从存储读取）
const currentState = $persistentStore.read("App_Status") || "background";

// 定义白名单域名
const whitelist = ["example.com", "apple.com"];

// 获取请求信息
const url = $request.url || "";

// 判断是否在白名单
const isWhitelisted = whitelist.some(domain => url.includes(domain));

if (currentState === "background" && !isWhitelisted) {
    // 拦截请求
    console.log(`拦截请求：${url}`);
    $done({ response: { status: 403, body: "Blocked by AppStatusControl" } });
} else {
    // 放行请求
    console.log(`放行请求：${url}`);
    $done({});
}