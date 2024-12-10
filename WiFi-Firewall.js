const appName = $environment.application || "Unknown";
const isActive = $environment.active; // 判断是否在前台

if (isActive) {
  $persistentStore.write("Active", "AppStatus");
  console.log(`前台应用: ${appName}`);
} else {
  $persistentStore.write("Inactive", "AppStatus");
  console.log(`后台应用: ${appName}`);
}

$done();