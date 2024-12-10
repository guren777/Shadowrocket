const readTimer = $persistentStore.read("WiFi_Timer") || "0";
const record = $persistentStore.read("Block_Num") || "0";
let block = {
  matched: false
};

if (readTimer) {
  const currentTime = Date.now();
  const markTime = parseInt(readTimer, 10); // 确保为数字
  if (currentTime - markTime <= 15000) {
    block.matched = true;
    const addNum = JSON.stringify(parseInt(record, 10) + 1);
    $persistentStore.write(addNum, "Block_Num");
    console.log(`已拦截: ${$request.hostname}`);
  } else {
    $persistentStore.write("", "Block_Num");
    $persistentStore.write("", "WiFi_Timer");
    if (record) {
      console.log(`✅ 结束, 共 ${record} 条网络请求`);
    }
  }
}

$done(block);