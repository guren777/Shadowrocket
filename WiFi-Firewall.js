(async () => {
  const network = $network.wifi.ssid;
  const currentTime = Date.now();
  
  if (network) {
    const wifiEnv = $persistentStore.read("Firewall_Env");
    
    if (!wifiEnv) { // 如果上次是在蜂窝环境运行
      const lastSwitchTime = $persistentStore.read("WiFi_Timer");
      
      if (!lastSwitchTime || (currentTime - parseInt(lastSwitchTime)) >= 3000) { // 判断时间间隔是否 >= 3秒
        const timeSaved = $persistentStore.write(currentTime.toString(), "WiFi_Timer");
        const envSaved = $persistentStore.write("1", "Firewall_Env");
        
        if (timeSaved && envSaved) {
          $notification.post("防火墙开始拦截", "", `已从蜂窝网络切换至 ${network}`);
        } else {
          $notification.post("防火墙", "", "存储数据时发生错误");
        }
      }
    }
  } else {
    const envCleared = $persistentStore.write("", "Firewall_Env");
    if (!envCleared) {
      $notification.post("防火墙", "", "清除环境状态失败");
    }
  }
})()
  .catch((err) => $notification.post("防火墙", "", `出现错误: ${err.message || err}`))
  .finally(() => $done({}));