const appStatus = $persistentStore.read("AppStatus") || "Inactive";
const whitelist = ["example.com", "whitelisted-domain.com"];

let block = {
  matched: false
};

if (appStatus === "Inactive") {
  const hostname = $request.hostname || "";
  if (!whitelist.includes(hostname)) {
    block.matched = true;
    console.log(`拦截请求: ${hostname}`);
  }
}

$done(block);