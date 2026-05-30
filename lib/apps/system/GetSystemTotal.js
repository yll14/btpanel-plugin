import { btAction } from '../../api/index.js'
import { GetConfig } from '../../function/function.js'
import { buildSection } from '../../function/format.js'

function cfg() {
  return GetConfig(`config`, `System`)
}

function formatMsg(title, body) {
  if (!body) return '当前配置未启用任何显示项'
  return `【${title}】\n\n${body}`.trimEnd()
}

export async function getSystemTotal() {
  const data = await btAction('system', 'GetSystemTotal')
  const config = cfg()

  const body =
    buildSection('🖥️ 系统信息', [
      config.system && `• 系统：${data.system}`,
      config.version && `• 面板版本：${data.version}`,
      config.time && `• 运行时间：${data.time}`,
    ]) +
    buildSection('📊 内存信息', [
      config.memTotal && `• 总物理内存：${data.memTotal} MB (${data.memNewTotal})`,
      config.memRealUsed && `• 实际使用内存：${data.memRealUsed} MB (${data.memNewRealUsed})`,
      config.memAvailable && `• 可用内存：${data.memAvailable} MB`,
      config.memFree && `• 空闲内存：${data.memFree} MB`,
      config.memBuffers && `• 缓冲区内存：${data.memBuffers} MB`,
      config.memCached && `• 缓存内存：${data.memCached} MB`,
      config.memShared && `• 共享内存：${data.memShared} MB`,
    ]) +
    buildSection('💻 CPU 信息', [
      config.cpuNum && `• CPU 核心数：${data.cpuNum} 核`,
      config.cpuRealUsed && `• CPU 使用率：${data.cpuRealUsed}%`,
    ])

  return formatMsg('服务器系统基础统计', body)
}

export async function getDiskInfo() {
  const disks = await btAction('system', 'GetDiskInfo')
  const config = cfg()
  if (!Array.isArray(disks) || !disks.length) return '暂无磁盘信息'

  const lines = disks
    .map((d) => {
      const size = d.size || []
      const parts = [
        config.diskPath && `${d.path}`,
        config.diskType && `[${d.type}]`,
        config.diskTotal && `总量 ${size[0] || '-'}`,
        config.diskUsed && `已用 ${size[1] || '-'}`,
        config.diskAvail && `可用 ${size[2] || '-'}`,
        config.diskUsage && `${size[3] || '-'}`,
      ].filter(Boolean)
      return parts.length ? `• ${parts.join(' ')}` : null
    })
    .filter(Boolean)

  return formatMsg('磁盘信息', lines.join('\n'))
}

export async function getMemInfo() {
  const d = await btAction('system', 'GetMemInfo')
  const config = cfg()

  const body = buildSection('📊 内存详情', [
    config.memTotal && `• 总内存：${d.memTotal} MB`,
    config.memRealUsed && `• 实际使用：${d.memRealUsed} MB`,
    config.memAvailable && `• 可用：${d.memAvailable} MB`,
    config.memFree && `• 空闲：${d.memFree} MB`,
    config.memBuffers && `• 缓冲区：${d.memBuffers} MB`,
    config.memCached && `• 缓存：${d.memCached} MB`,
  ])

  return formatMsg('内存详情', body)
}

export async function getCpuInfo() {
  const d = await btAction('system', 'GetCpuInfo')
  const config = cfg()
  if (!Array.isArray(d)) return '暂无 CPU 信息'

  const coreSummary = [
    config.cpuLogicNum && `逻辑核心：${d[1]}`,
    config.cpuPhysCores && `物理核心：${d[4]}`,
    config.cpuPhysNum && `物理 CPU：${d[5]}`,
  ].filter(Boolean)

  const body = buildSection('💻 CPU 详情', [
    config.cpuModel && `• 型号：${d[3] || '-'}`,
    config.cpuUsageTotal && `• 整体使用率：${d[0]}%`,
    coreSummary.length && `• ${coreSummary.join(' | ')}`,
    config.cpuPerCore &&
      Array.isArray(d[2]) &&
      `• 各核：${d[2].map((v, i) => `核${i + 1}: ${v}%`).join(' | ')}`,
  ])

  return formatMsg('CPU 详情', body)
}

export async function getLoadAverage() {
  const d = await btAction('system', 'GetLoadAverage')
  const config = cfg()

  const threshold = [
    config.loadSafe && `安全阈值：${d.safe}`,
    config.loadMax && `最大：${d.max}`,
  ].filter(Boolean)

  const body = buildSection('📈 系统负载', [
    config.loadOne && `• 1 分钟：${d.one}`,
    config.loadFive && `• 5 分钟：${d.five}`,
    config.loadFifteen && `• 15 分钟：${d.fifteen}`,
    threshold.length && `• ${threshold.join(' / ')}`,
  ])

  return formatMsg('系统负载', body)
}

export async function getNetWork() {
  const d = await btAction('system', 'GetNetWork')
  const config = cfg()

  const nicLines = []
  if (config.netNic && d.network) {
    for (const [name, info] of Object.entries(d.network)) {
      nicLines.push(`• ${name} ↑${info.up} KB/s ↓${info.down} KB/s`)
    }
  }

  const body =
    buildSection('🌐 网络流量', [
      config.netSystem && `• 系统：${d.system || '-'}`,
      config.netTime && `• 运行时间：${d.time || '-'}`,
      config.netRate && `• 上传速率：${d.up} KB/s | 下载速率：${d.down} KB/s`,
      config.netTotal && `• 总上传：${d.upTotal} | 总下载：${d.downTotal}`,
    ]) +
    (nicLines.length ? nicLines.join('\n') + '\n' : '')

  return formatMsg('网络流量', body.trimEnd())
}

export async function reMemory() {
  const d = await btAction('system', 'ReMemory')
  const config = cfg()

  const body = buildSection('✅ 内存释放完成', [
    config.reMemTotal && `• 总内存：${d.memTotal} MB`,
    config.reMemFree && `• 空闲：${d.memFree} MB`,
    config.reMemRealUsed && `• 实际使用：${d.memRealUsed} MB`,
  ])

  return formatMsg('释放内存', body)
}

export async function reWeb() {
  const d = await btAction('system', 'ReWeb')
  const config = cfg()
  if (!config.reWebResult) return '当前配置未启用任何显示项'
  return d.msg || '面板重启指令已发出'
}

export async function clearSystem() {
  const d = await btAction('system', 'ClearSystem')
  const config = cfg()

  if (Array.isArray(d)) {
    const parts = [
      config.clearCount && `${d[0]} 个文件`,
      config.clearBytes && `${d[1]} 字节`,
    ].filter(Boolean)
    if (!parts.length) return '当前配置未启用任何显示项'
    return `系统清理完成：${parts.join('，')}`
  }

  if (!config.clearCount && !config.clearBytes) return '当前配置未启用任何显示项'
  return d.msg || '系统清理完成'
}

export async function serviceAdmin(name, type) {
  const d = await btAction('system', 'ServiceAdmin', { name, type })
  const config = cfg()
  if (!config.serviceResult) return '当前配置未启用任何显示项'
  return d.msg || '操作完成'
}
