import { btAction } from '../../api/index.js'

export async function getDatabaseStatus() {
  const res = await btAction('database', 'GetRunStatus')
  if (res?.status === false) return res.msg || '获取失败'
  return `【MySQL 运行状态】

• 状态：${res.msg || res.status || '运行中'}
${res.data ? `• 详情：${JSON.stringify(res.data)}` : ''}`.trimEnd()
}
