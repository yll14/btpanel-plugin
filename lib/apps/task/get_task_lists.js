import { btAction } from '../../api/index.js'

export async function listTasks() {
  const tasks = await btAction('task', 'get_task_lists')
  if (!Array.isArray(tasks) || !tasks.length) return '后台任务队列为空'

  const lines = tasks.map((t, i) => {
    const name = t.name || t.title || t.task_name || `任务${i + 1}`
    const status = t.status ?? t.state ?? '-'
    return `• ${name} | 状态：${status}${t.msg ? ` | ${t.msg}` : ''}`
  })
  return `【后台任务队列】共 ${tasks.length} 个\n\n${lines.join('\n')}`
}
