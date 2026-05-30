import { btAction } from '../../api/index.js'

export async function setCronStatus(id, status) {
  const res = await btAction('crontab', 'set_cron_status', {
    id,
    status: String(status),
  })
  return res.msg || '设置成功'
}
