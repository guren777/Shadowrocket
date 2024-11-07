# 懒人配置（含策略组）
# 更新时间：2024-07-15
# Shadowrocket添加配置方法：配置 - 右上角➕ - 粘贴配置链接 - 下载 - 点击对应的配置文件 - 使用配置。
[General]
# Shadowrocket快速使用方法：
# 1.首页 - 添加节点。
# 2.设置 - 延迟测试方法，选择CONNECT。
# 3.首页 - 连通性测试，选择可用节点连接。
# ----------
# 添加/更新订阅链接时异常原因：
# "forbidden"表示订阅被重置或令牌(token)错误。
# "not found"表示路径信息错误。
# "service unavailable"表示域名信息错误或域名被运营商屏蔽。
# 添加/更新订阅链接时，如果提示异常错误，可以尝试的解决方法：
# 1.全局路由选代理，使用另外一个节点来添加/更新订阅链接。
# 2.切换网络后再添加/更新订阅链接。
# 3.检查订阅链接是否错误或失效。
# ----------
# Shadowrocket打开HTTPS解密方法：
# 1.点击配置文件ⓘ - HTTPS解密 - 证书 - 生成新的CA证书 - 安装证书。
# 2.手机设置 - 已下载描述文件 - 安装。
# 3.手机设置 - 通用 - 关于本机 - 证书信任设置 - 开启对应Shadowrocket证书信任。
# ----------
# 旁路系统。如果禁用此选项，可能会导致一些系统问题，如推送通知延迟。
bypass-system = true
# 跳过代理。此选项强制这些域名或IP的连接范围由Shadowrocket TUN接口来处理，而不是Shadowrocket代理服务器。此选项用于解决一些应用程序的一些兼容性问题。
skip-proxy = 192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,localhost,*.local,captive.apple.com,*.ccb.com,*.abchina.com.cn,*.psbc.com,www.baidu.com
# TUN旁路路由。Shadowrocket TUN接口只能处理TCP协议。使用此选项可以绕过指定的IP范围，让其他协议通过。
tun-excluded-routes = 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.88.99.0/24, 192.168.0.0/16, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 255.255.255.255/32, 239.255.255.250/32
# DNS覆写。使用普通DNS或加密DNS（如doh、doq、dot等）覆盖默认的系统DNS。有些dns over https支持http3，所以尝试查询，如果支持就切换到http3，可在doh链接后面加上#no-h3关闭。doh强制通过h3查询的写法是将“https”改成“h3”，如h3://dns.alidns.com/dns-query。
dns-server = quic://dns.adguard-dns.com,94.140.14.14,94.140.15.15,https://dns.quad9.net/dns-query,9.9.9.9,149.112.112.112,https://doh.opendns.com/dns-query,208.67.222.222,208.67.220.220,https://security.cloudflare-dns.com/dns-query,1.1.1.2,1.0.0.2,https://doh.applied-privacy.net/quer,https://public.dns.iij.jp/dns-query
# 备用DNS。当覆写DNS查询失败或查询时间超过2秒，Shadowrocket会自动回退备用DNS。如需指定多个DNS，可用逗号分隔。system表示回退到系统DNS。
fallback-dns-server = system
# 启用IPv6支持。false表示不启用，true表示启用。（注：即使不启用此选项，当本地网络环境支持IPv6，并且节点域名支持IPv6解析，Shadowrocket也会使用节点的IPv6地址进行访问。解决方法是关闭节点域名的IPv6解析，或者在配置文件的[Host]项目下为节点域名指定IP地址。）
ipv6 = true
# 首选IPv6。优先向IPv6的DNS服务器查询AAAA记录，优先使用AAAA记录。false表示不启用。
prefer-ipv6 = false
# 直连的域名类规则使用系统dns进行查询。false表示不启用。
dns-direct-system = false
# ping数据包自动回复。
icmp-auto-reply = true
# 不开启时，「重写的REJECT策略」默认只有在配置模式下生效。开启后，可以令该策略在其他全局路由模式下都生效。
always-reject-url-rewrite = false
# 私有IP应答。如果不启用此选项，域名解析返回私有IP，Shadowrocket会认为该域名被劫持而强制使用代理。
private-ip-answer = true
# 直连域名解析失败后使用代理。false表示不启用。
dns-direct-fallback-proxy = true
# TUN包含路由。默认情况下，Shadowrocket接口会声明自己为默认路由，但由于Wi-Fi接口的路由较小，有些流量可能不会通过Shadowrocket接口。使用此选项可以添加一个较小的路由表。
tun-included-routes = 
# 总是真实IP。此选项要求Shadowrocket在TUN处理DNS请求时返回一个真实的IP地址而不是假的IP地址。
always-real-ip = 
# DNS劫持。有些设备或软件总是使用硬编码的DNS服务器，例如Netflix通过Google DNS(8.8.8.8或8.8.4.4)发送请求，您可以使用此选项来劫持查询。
hijack-dns = 119.29.29.29:53,119.28.28.28:53,182.254.118.118:53,182.252.116.116:53,223.5.5.5:53,223.6.6.6:53,114.114.114.114:53,180.76.76.76:53,8.8.8.8:53,8.8.4.4:53
# 当UDP流量匹配到规则里不支持UDP转发的节点策略时重新选择回退行为，可选行为包括DIRECT、REJECT。DIRECT表示直连转发UDP流量，REJECT表示拒绝转发UDP流量。
udp-policy-not-supported-behaviour = REJECT
# 包含配置。如“include=a.conf”表示当前配置包含另一个配置a.conf的内容，当前配置的优先级高于a.conf。此选项是对配置建立包含关系，以满足同时使用多个配置的需求。
include = 
# 此选项允许返回一个虚假的IP地址，如“stun-response-ip=1.1.1.1”、“stun-response-ipv6=::1”，目的是防止真实IP地址泄漏，提高WebRTC的隐私和安全性。
# stun-response-ip =
# stun-response-ipv6 =
# 网络兼容模式。当参数的值设定为3时的效果等同于：设置 - 代理 - 代理类型 - None。
# compatibility-mode =
# 强制所有域名使用本地DNS解析。设置为true表示启用。（此参数为隐藏属性，建议谨慎设置，可能导致相关域名的CDN失效。）
# always-ip-address =
[Proxy]
# 添加本地节点。该项目的节点解析是为了兼容部分配置文件，不能当作Shadowrocket添加节点的优先选择。
# Shadowsocks类型：
# 节点名称=ss,地址,端口,password=密码,其他参数(如method=aes-256-cfb,obfs=websocket,plugin=none)
# Vmess类型：
# 节点名称=vmess,地址,端口,password=密码,其他参数(如alterId=0,method=auto,obfs=websocket,tfo=1)
# VLESS类型：
# 节点名称=vless,地址,端口,password=密码,tls=true,其他参数(如obfs=websocket,peer=example.com)
# HTTP/HTTPS/Socks5/Socks5 Over TLS等类型：
# 节点名称=http,地址,端口,用户,密码
# 节点名称=https,地址,端口,用户,密码
# 节点名称=socks5,地址,端口,用户,密码
# 节点名称=socks5-tls,地址,端口,用户,密码,skip-common-name-verify=true
# Trojan类型：
# 节点名称=trojan,地址,端口,password=密码,其他参数(如allowInsecure=1,peer=example.com)
# Hysteria类型：
# 节点名称=hysteria,地址,端口,auth=密码,obfsParam=混淆,protocol=协议,udp=1,其他参数(如peer=example.com,alpn=h2,upmbps=100,downmbps=100)
# Hysteria2类型：
# 节点名称=hysteria2,地址,端口,auth=密码,obfsParam=混淆,udp=1,其他参数(如peer=example.com,alpn=h3)
# TUIC类型：
# 节点名称=tuic,地址,端口,password=密码,udp=1,其他参数(如user=uuid值,peer=example.com,alpn=h2)
# Juicity类型：
# 节点名称=juicity,地址,端口,password=密码,udp=1,其他参数(如user=uuid值,peer=example.com,alpn=h2)
# WireGuard类型：
# 节点名称=wireguard,地址,端口,privateKey=私钥,publicKey=公钥,ip=子网IP,udp=1,其他参数(如dns=1.1.1.1,mtu=1350,keepalive=40,reserved=1/2/3)
# Snell类型：
# 节点名称=snell,地址,端口,password=密码,udp=1,其他参数(如obfs=http,obfs-host=example.com,obfs-uri=/abc)

[Proxy Group]
# 代理分组类型：
# select:手动切换节点。
# url-test:自动切换延迟最低节点。
# fallback:节点挂掉时自动切换其他可用节点。
# load-balance:不同规则的请求使用分组里的不同节点进行连接。
# random:随机使用分组里的不同节点进行连接。
# ----------
# policy-regex-filter表示正则式或关键词筛选，常用写法：
# 保留节点名称含有关键词A和B的节点:
# (?=.*(A))^(?=.*(B))^.*$
# 保留节点名称含有关键词A或B的节点:
# A|B
# 排除节点名称含有关键词A或B的节点:
# ^((?!(A|B)).)*$
# 保留节点名称含有关键词A并排除含有关键词B的节点:
# (?=.*(A).)^((?!(B)).)*$
# ----------
# 代理分组其他设置参数：
# interval:指定间隔多长时间后需要重新发起测试。
# timeout:如果测试在超时前未完成，放弃测试。
# tolerance:只有当新优胜者的分数高于旧优胜者的分数加上公差时，才会进行线路更换。
# url:指定要测试的URL。
# ----------
# 不含正则筛选的代理分组，示例：
# 名称=类型(如select,url-test,fallback,load-balance,random),策略(如direct,proxy,订阅名称,代理分组,节点),interval=测试周期,timeout=超时时间,tolerance=公差,policy-select-name=指定选择的节点备注名称,select=默认策略(0表示第一个策略,1表示第二个策略,2表示第三个策略……),url=测试地址
# 含正则筛选的代理分组，示例：
# 名称=类型(如select,url-test,fallback,load-balance,random),policy-regex-filter=正则式或关键词筛选,interval=测试周期,timeout=超时时间,tolerance=公差,policy-select-name=指定选择的节点备注名称,select=默认策略(0表示第一个策略,1表示第二个策略,2表示第三个策略……),url=测试地址
# 开启订阅筛选的代理分组，示例：
# 名称=类型(如select,url-test,fallback,load-balance,random),订阅名称(多个订阅时,用逗号分隔),use=true,policy-regex-filter=正则式或关键词筛选(省略该参数时,表示匹配对应订阅的全部节点),interval=测试周期,timeout=超时时间,tolerance=公差,policy-select-name=指定选择的节点备注名称,select=默认策略(0表示第一个策略,1表示第二个策略,2表示第三个策略……),url=测试地址
# ----------
[Proxy]
# 策略组
# 腾讯
# 币安
# 美洲
# 欧洲
# 亚洲
# 自动选择

[Proxy Group]
Tencent🐧 = url-test,url=http://www.gstatic.com/generate_204,interval=300,tolerance=50,timeout=3,select=11,policy-regex-filter=(?i)(韩国|🇰🇷|日本|🇯🇵|新加坡|🇸🇬|马来西亚|🇲🇾|美国|🇺🇸)
Binance🎰 = url-test,url=http://www.gstatic.com/generate_204,interval=300,tolerance=50,timeout=3,select=4,policy-regex-filter=(?i)(香港|🇭🇰|台湾|日本|🇯🇵|新加坡|🇸🇬|韩国|🇰🇷|马来西亚|🇲🇾)
美洲🟢🪜 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=100,timeout=5,select=0,policy-regex-filter=(?i)(美国|🇺🇸|加拿大|🇨🇦|墨西哥|🇲🇽|巴西|🇧🇷|阿根廷|🇦🇷|智利|🇨🇱|哥伦比亚|🇨🇴|牙买加|🇯🇲|巴拉圭|🇵🇾|海地|🇭🇹)
欧洲🟣🪜 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=100,timeout=5,select=0,policy-regex-filter=(?i)(英国|🇬🇧|法国|🇫🇷|德国|🇩🇪|荷兰|🇳🇱|比利时|🇧🇪|瑞士|🇨🇭|乌克兰|🇺🇦|俄罗斯|🇷🇺|西班牙|🇪🇸|意大利|🇮🇹)
亚洲🔴🪜 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=100,timeout=5,select=0,policy-regex-filter=(?i)(香港|🇭🇰|台湾|taiwan|韩国|🇰🇷|日本|🇯🇵|新加坡|🇸🇬|马来西亚|🇲🇾|越南|🇻🇳|印度|🇮🇳|泰国|🇹🇭|菲律宾|🇵🇭 |土耳其|🇹🇷|以色列|🇮🇱)
Auto🤖 = url-test,policy-regex-filter=.*,interval=300,tolerance=50,url=http://www.gstatic.com/generate_204,timeout=3,select=15

[Rule]
DOMAIN-KEYWORD,bsc-dataseed,BINANCE🎰
DOMAIN-KEYWORD,pancakeswap,BINANCE🎰
DOMAIN-KEYWORD,tokenpocket,BINANCE🎰
DOMAIN-KEYWORD,bcebos,BINANCE🎰
DOMAIN-KEYWORD,mytokenpocket,BINANCE🎰
DOMAIN-KEYWORD,cfptop,香港🇭🇰
DOMAIN-KEYWORD,coffeepp,香港🇭🇰
DOMAIN-KEYWORD,youtube,AUTO🤖
ChatGPT = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
YouTube = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
Netflix = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
Disney+ = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
HBO = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
TikTok = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
Spotify = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=1,url=http://www.gstatic.com/generate_204
Telegram = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
Twitter = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
Facebook = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
PayPal = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=1,url=http://www.gstatic.com/generate_204
Amazon = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=1,url=http://www.gstatic.com/generate_204
苹果服务 = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
谷歌服务 = select,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
微软服务 = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
哔哩哔哩 = select,DIRECT,PROXY,香港节点,台湾节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
游戏平台 = select,DIRECT,PROXY,香港节点,台湾节点,日本节点,新加坡节点,韩国节点,美国节点,interval=86400,timeout=5,select=0,url=http://www.gstatic.com/generate_204
香港节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=HK|Hong|hong|香港|深港|沪港|京港|港
台湾节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=TW|Taiwan|taiwan|台湾|台北|台中|新北|彰化
日本节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=JP|Japan|japan|Tokyo|tokyo|日本|东京|大阪|京日|苏日|沪日|上日|川日|深日|广日
新加坡节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=SG|Sing|sing|新加坡|狮城|沪新|京新|深新|杭新|广新
韩国节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=KR|Korea|korea|KOR|韩国|首尔|韩|韓|春川
美国节点 = url-test,url=http://www.gstatic.com/generate_204,interval=600,tolerance=0,timeout=5,select=0,policy-regex-filter=US|USA|America|america|United States|美国|凤凰城|洛杉矶|西雅图|芝加哥|纽约|沪美|美

[Rule]
# 规则类型：
# 隐私保护
DOMAIN-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Privacy/Privacy_Domain.list,REJECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Privacy/Privacy.list,REJECT
# 反劫持
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Hijacking/Hijacking.list,REJECT
RULE-SET,https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Hijacking.list,REJECT
# Instagram
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Instagram/Instagram.list,AUTO🤖
# Telegram
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Telegram/Telegram.list,AUTO🤖
# Whatsapp
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Whatsapp/Whatsapp.list,AUTO🤖
# Twitter
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Twitter/Twitter.list,AUTO🤖
# Spotify
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Spotify/Spotify.list,DIRECT
# YouTube
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/YouTube/YouTube.list,AUTO🤖
# Facebook
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Facebook/Facebook.list,AUTO🤖
# Binance
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Binance/Binance.list,BINANCE🎰
# WeChat
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/WeChat/WeChat.list,TENCENT🐧
# Tencent
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Tencent/Tencent.list,TENCENT🐧
# DOMAIN-SUFFIX：匹配请求域名的后缀。如“DOMAIN-SUFFIX,example.com,DIRECT”可以匹配到“a.example.com、a.b.example.com”。
# DOMAIN-KEYWORD：匹配请求域名的关键词。如“DOMAIN-KEYWORD,exa,DIRECT”可以匹配到“a.example.com、a.b.example.com”。
# DOMAIN：匹配请求的完整域名。如“DOMAIN,www.example.com,DIRECT”只能匹配到“www.example.com”。
# （当为DOMAIN、DOMAIN-SUFFIX和DOMAIN-KEYWORD类型分别设置相同的值时，只有其中一种类型会生效。）
# USER-AGENT：匹配用户代理字符串，支持使用通配符“*”。如“USER-AGENT,MicroMessenger*,DIRECT”可以匹配到“MicroMessenger Client”。
# URL-REGEX：匹配URL正则式。如“URL-REGEX,^https?://.+/item.+,REJECT”可以匹配到“https://www.example.com/item/abc/123”。
# IP-CIDR：匹配IPv4或IPv6地址。如“IP-CIDR,192.168.1.0/24,DIRECT”可以匹配到IP段“192.168.1.1～192.168.1.254”。当域名请求遇到IP类规则时，Shadowrocket会向本地DNS服务器发送查询请求，以判断主机IP是否匹配规则。若IP类规则加“no-resolve”(如：IP-CIDR,172.16.0.0/12,DIRECT,no-resolve)，则域名请求将会跳过此规则，不会触发本地DNS查询。
# IP-ASN：匹配IP地址隶属的ASN编号。如"IP-ASN,56040,DIRECT"可以匹配到属于China Mobile Communications Corporation网络的IP地址。
# RULE-SET：匹配规则集内容。规则集的内容需包含规则类型，如"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Apple/Apple.list"。（兼容仅包含IP地址且不带规则类型的规则集）
# DOMAIN-SET：匹配域名集内容。域名集的内容不包含规则类型，如"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Apple/Apple_Domain.list"。
# SCRIPT：匹配脚本名称。（创建rule类型脚本，再添加script类型的规则。）
# DST-PORT：匹配目标主机名的端口号。如“DST-PORT,443,DIRECT”可以匹配到443目标端口。
# GEOIP：匹配IP数据库。如“GEOIP,CN,DIRECT”可以匹配到归属地为CN的IP地址。
# FINAL：兜底策略。如“FINAL,PROXY”表示当其他所有规则都匹配不到时才使用FINAL规则的策略。
# AND：逻辑规则，与规则。如“AND,((DOMAIN,www.example.com),(DST-PORT,123)),DIRECT”可以匹配到“www.example.com:123”。
# NOT：逻辑规则，非规则。如“NOT,((DST-PORT,123)),DIRECT”可以匹配到除了“123”端口的其他所有请求。
# OR：逻辑规则，或规则。如“OR,((DST-PORT,123),(DST-PORT,456)),DIRECT”可以匹配到“123”或“456”端口的所有请求。
# ----------
# 规则策略：
# PROXY：代理。通过代理服务器转发流量。
# DIRECT：直连。连接不经过任何代理服务器。
# REJECT：拒绝。返回HTTP状态码404，没有内容。
# REJECT-DICT：拒绝。返回HTTP状态码200，内容为空的JSON对象。
# REJECT-ARRAY：拒绝。返回HTTP状态码200，内容为空的JSON数组。
# REJECT-200：拒绝。返回HTTP状态码200，没有内容。
# REJECT-IMG：拒绝。返回HTTP状态码200，内容为1像素GIF。
# REJECT-TINYGIF：拒绝。返回HTTP状态码200，内容为1像素GIF。
# REJECT-DROP：拒绝。丢弃IP包。
# REJECT-NO-DROP：拒绝。返回ICMP端口不可达。
# 除此之外，规则策略还可以选择「代理分组」、「订阅名称」、「分组」、「节点」。
# ----------
# 规则匹配的优先级：
# 1.模块规则优先于配置文件规则。
# 2.规则从上到下依次匹配。
# 3.域名规则优先于IP规则。
# ----------
# 关于屏蔽443端口的UDP流量的解释内容：HTTP3/QUIC协议开始流行，但是国内ISP和国际出口的UDP优先级都很低，表现很差，屏蔽掉以强制回退HTTP2/HTTP1.1。（如需启用该逻辑规则，请删除AND前面的注释符号#）
# AND,((PROTOCOL,UDP),(DST-PORT,443)),REJECT-NO-DROP
# ----------
# 国外常用服务单独分流：YouTube，Netflix，Disney+，HBO，Spotify，Telegram，PayPal，Twitter，Facebook，Google，TikTok，GitHub，ChatGPT。
# 国内常用服务单独分流：苹果服务，微软服务，哔哩哔哩，网易云音乐，游戏平台，亚马逊，百度，豆瓣，微信，抖音，新浪，知乎，小红书。
# EasyPrivacy
DOMAIN-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/EasyPrivacy/EasyPrivacy_Domain.list,REJECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/EasyPrivacy/EasyPrivacy.list,REJECT
# 隐私保护
DOMAIN-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Privacy/Privacy_Domain.list,REJECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Privacy/Privacy.list,REJECT
# 反劫持
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Hijacking/Hijacking.list,REJECT
RULE-SET,https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Hijacking.list,REJECT
# Instagram
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Instagram/Instagram.list,AUTO🤖
# Telegram
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Telegram/Telegram.list,AUTO🤖
# Whatsapp
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Whatsapp/Whatsapp.list,AUTO🤖
# Twitter
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Twitter/Twitter.list,AUTO🤖
# Spotify
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Spotify/Spotify.list,DIRECT
# YouTube
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/YouTube/YouTube.list,AUTO🤖
# Facebook
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Facebook/Facebook.list,AUTO🤖
# Binance
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Binance/Binance.list,BINANCE🎰
# WeChat
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/WeChat/WeChat.list,TENCENT🐧
# Tencent
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Tencent/Tencent.list,TENCENT🐧
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list,苹果服务
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/BiliBili/BiliBili.list,哔哩哔哩
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/NetEaseMusic/NetEaseMusic.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Baidu/Baidu.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/DouBan/DouBan.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/WeChat/WeChat.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/DouYin/DouYin.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Sina/Sina.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Zhihu/Zhihu.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/XiaoHongShu/XiaoHongShu.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/YouTube/YouTube.list,YOUTUBE
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Netflix/Netflix.list,NETFLIX
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Disney/Disney.list,DISNEY+
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/HBO/HBO.list,HBO
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Spotify/Spotify.list,SPOTIFY
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Telegram/Telegram.list,TELEGRAM
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/PayPal/PayPal.list,PAYPAL
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Twitter/Twitter.list,TWITTER
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Facebook/Facebook.list,FACEBOOK
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Amazon/Amazon.list,AMAZON
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/OpenAI/OpenAI.list,CHATGPT
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Sony/Sony.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Nintendo/Nintendo.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Epic/Epic.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/SteamCN/SteamCN.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Steam/Steam.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Game/Game.list,游戏平台
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/GitHub/GitHub.list,PROXY
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Microsoft/Microsoft.list,微软服务
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Google/Google.list,谷歌服务
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/TikTok/TikTok.list,TIKTOK
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global.list,PROXY
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/China/China.list,DIRECT
# 本地局域网地址的规则集。
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Lan/Lan.list,DIRECT
# 表示CN地区的IP分流走直连，GEOIP数据库用来判断IP是否属于CN地区。默认使用Shadowrocket自带的GEOIP数据库，如果您想替换其他数据库，可在 设置 - GeoLite2数据库 里添加和修改。
GEOIP,CN,DIRECT
# 表示当其他所有规则都匹配不到时才使用FINAL规则的策略。
FINAL,PROXY

[Host]
# 域名指定本地值：
# example.com=1.2.3.4
# 域名指定DNS服务器：
# example.com=server:1.2.3.4
# wifi名称指定DNS服务器，如需指定多个DNS，可用逗号分隔：
# ssid:wifi名称=server:1.2.3.4
# ----------
*.apple.com=server:system
*.icloud.com=server:system
localhost = 127.0.0.1

[URL Rewrite]
# Google搜索引擎防跳转的重写。
^https?://(www.)?g.cn https://www.google.com 302
^https?://(www.)?google.cn https://www.google.com 302

[MITM]
# Shadowrocket仅会解密hostname指定的域名的请求，可以使用通配符。也可以使用前缀 - 排除特定主机名，如 -*.example.com。iOS系统和某些应用有严格的安全策略，仅信任某些特定的证书，对这些域名启动解密可能导致问题，如 *.apple.com，*.icloud.com。
hostname = *.google.cn
