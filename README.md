<div align="center">

# 宝塔插件 V1.0.0 (btpanel-plugin)

> 基于宝塔面板 API 的 Yunzai 运维插件。如有 Bug 请提 [Issues](https://gitee.com/yll14/btpanel-plugin/issues/new/choose)，我会在看到后第一时间尝试修复。

</div>

# 插件功能

## 功能命令与描述

| 命令 | 描述 |
| -------- | ---- |
| `#宝塔帮助` | 获取宝塔插件帮助（支持 `#btpanel帮助` `#BT帮助`） |
| `#系统状态` | 查看服务器完整状态（字段可在配置中开关） |
| `#磁盘信息` | 查看磁盘分区信息 |
| `#内存详情` | 查看内存详细信息 |
| `#CPU详情` | 查看 CPU 详细信息 |
| `#系统负载` | 查看系统负载 |
| `#网络流量` | 查看网络流量 |
| `#释放内存` | 释放系统内存缓存（仅主人） |
| `#重启面板` | 重启宝塔面板服务（仅主人） |
| `#清理系统` | 清理系统垃圾文件（仅主人） |
| `#服务重启 nginx` | 管理服务启停，支持 nginx / mysqld / redis 等（仅主人） |
| `#网站列表` | 查看所有网站 |
| `#网站开启 域名` | 启用指定网站（仅主人） |
| `#网站停止 域名` | 停止指定网站（仅主人） |
| `#网站备份 域名` | 备份指定网站（仅主人） |
| `#网站SSL 域名` | 查看网站 SSL 证书信息 |
| `#数据库列表` | 查看所有数据库 |
| `#数据库状态` | 查看 MySQL 运行状态 |
| `#MySQL配置` | 查看 MySQL 配置信息 |
| `#数据库备份 库名` | 备份指定数据库（仅主人） |
| `#计划任务` | 查看所有计划任务 |
| `#任务启用 ID` | 启用计划任务（仅主人） |
| `#任务暂停 ID` | 暂停计划任务（仅主人） |
| `#任务日志 ID` | 查看计划任务日志 |
| `#FTP列表` | 查看 FTP 用户列表 |
| `#后台任务` | 查看面板后台任务队列 |
| `#安全扫描` | 查看安全扫描结果 |
| `#安全评分` | 查看安全扫描评分 |

<div align="center">

## 安装教程

### 方式一：通过 git 下载插件（推荐：后续可直接更新）

在云崽根目录执行命令（二选一）

***Gitee***

```sh
git clone --depth=1 https://gitee.com/yll14/btpanel-plugin.git ./plugins/btpanel-plugin/
```

***Github***

```sh
git clone --depth=1 https://github.com/yll14/btpanel-plugin.git ./plugins/btpanel-plugin/
```

***若拉取速度慢 / 无法访问，可通过镜像加速***

```sh
# Github - 通过 ghproxy.net 镜像加速
git clone --depth=1 https://ghproxy.net/https://github.com/yll14/btpanel-plugin.git ./plugins/btpanel-plugin/
```

***CNB***

```sh
git clone --depth=1 https://cnb.cool/yll14/btpanel-plugin.git ./plugins/btpanel-plugin/
```

### 方式二：手动下载插件（不推荐：后续无法直接更新，需手动再次下载）

下载仓库解压 zip 文件，将 `btpanel-plugin-master` 放入 Yunzai / Miao-Yunzai 的 `/plugins` 目录下，重命名去掉后面的 `-master`

</div>

### 安装依赖（一定要安装依赖）

```
pnpm install --filter=btpanel-plugin
```

或者

```
pnpm i
```

## 配置

1. 宝塔面板 → 面板设置 → API 接口 → 开启并获取 **接口密钥**
2. 编辑 `config/Config.yaml`：

```yaml
bt_url: "https://你的面板地址:端口"
API_SK: "你的API密钥"
```

也可通过 **锅巴插件** 可视化配置面板地址与 API 密钥。

`config/system/` 下每个功能一个 yaml 文件，与 `lib/apps/system/` 代码一一对应（支持锅巴开关配置）。

## 插件 API 文档

本插件 API 调用参考宝塔官方文档：[API 概览](https://docs.bt.cn/category/api-%E6%A6%82%E8%A7%88)

## 其他

- 由于宝塔 API 可能随面板版本变更，部分接口可能失效。若发现失效 API，可联系作者或发起 [Issues](https://gitee.com/yll14/btpanel-plugin/issues/new/choose)

- **_联系方式_**

- 请注明来意及来源
  <br/>

- QQ：[`2443958507`](https://qm.qq.com/cgi-bin/qm/qr?k=Vzr6Z6yISyfTNKic29xQEattdPxHldPW)

<br/>

- **_邮箱联系方式_**

- [`ll@yll14.cn`](mailto:ll@yll14.cn)

- [`2443958507@qq.com`](mailto:2443958507@qq.com)

如果可以的话，给本项目个 star 来支持本项目，您的支持就是给我最大的鼓励，谢谢。

## 免责声明

1. 功能仅限内部交流与小范围使用，请勿将 btpanel-plugin 用于以盈利为目的的场景

2. 本插件仅供交流学习使用，如有侵权请联系，会立即修改或删除

3. 使用本插件造成的一切损失，以及不良影响，由使用者承担

<div align="center">

Yunzai-Bot 插件库：[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index) / [☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) / [☞Github](https://github.com/Le-niao/Yunzai-Bot)

宝塔面板：[☞宝塔官网](https://www.bt.cn)

</div>
