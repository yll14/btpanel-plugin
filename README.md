<div align="center">

# 宝塔插件 (BtPanel-Plugin)

基于宝塔面板 API 的 Yunzai 运维插件

</div>

## 功能概览

| 模块 | 命令示例 | 说明 |
|------|----------|------|
| 系统 | `#系统状态` `#磁盘信息` `#网络流量` | 查看服务器状态 |
| 系统 | `#释放内存` `#重启面板` `#服务重启 nginx` | 运维操作（仅主人） |
| 网站 | `#网站列表` `#网站开启 域名` | 网站管理 |
| 数据库 | `#数据库列表` `#数据库备份 库名` | 数据库管理 |
| 计划任务 | `#计划任务` `#任务启用 1` | 定时任务管理 |
| FTP | `#FTP列表` | FTP 用户查询 |
| 任务 | `#后台任务` | 面板后台队列 |
| 安全 | `#安全扫描` `#安全评分` | 安全扫描结果 |
| 帮助 | `#宝塔帮助` | 查看命令帮助 |

## 安装

```sh
git clone --depth=1 https://gitee.com/yll14/btpanel-plugin.git ./plugins/btpanel-plugin/
```

```sh
pnpm install --filter=btpanel-plugin
```

## 配置

1. 宝塔面板 → 面板设置 → API 接口 → 开启并获取 **接口密钥**
2. 编辑 `config/Config.yaml`：

```yaml
bt_url: "https://你的面板地址:端口"
API_SK: "你的API密钥"
```

也可通过 **锅巴插件** 可视化配置。

`config/System.yaml` 可控制系统状态命令中各字段的显示开关。

## 插件API文档
文档请看宝塔面板官方文档[https://docs.bt.cn/](https://docs.bt.cn/category/api-%E6%A6%82%E8%A7%88)

## 免责声明

本插件仅供学习交流，使用本插件造成的任何损失由使用者自行承担。
