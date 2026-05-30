import { listSites, siteStart, siteStop, siteBackup, getSiteSsl } from './service.js'
import { checkMaster } from '../../function/auth.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#网站列表$/, fnc: 'listSites', desc: '查看所有网站' },
  {
    reg: /^#网站开启\s+(\S+)$/,
    fnc: 'startSite',
    desc: '启用网站，如 #网站开启 example.com',
  },
  {
    reg: /^#网站停止\s+(\S+)$/,
    fnc: 'stopSite',
    desc: '停止网站，如 #网站停止 example.com',
  },
  {
    reg: /^#网站备份\s+(\S+)$/,
    fnc: 'backupSite',
    desc: '备份网站，如 #网站备份 example.com',
  },
  {
    reg: /^#网站SSL\s+(\S+)$/,
    fnc: 'siteSsl',
    desc: '查看网站 SSL 证书，如 #网站SSL example.com',
  },
]

export const SiteApp = {
  rules: commands,

  listSites(e) {
    return replyHandle(e, '网站列表', () => listSites())
  },
  startSite(e) {
    if (!checkMaster(e)) return
    const name = e.msg.match(commands[1].reg)[1]
    return replyHandle(e, '网站开启', () => siteStart(name))
  },
  stopSite(e) {
    if (!checkMaster(e)) return
    const name = e.msg.match(commands[2].reg)[1]
    return replyHandle(e, '网站停止', () => siteStop(name))
  },
  backupSite(e) {
    if (!checkMaster(e)) return
    const name = e.msg.match(commands[3].reg)[1]
    return replyHandle(e, '网站备份', () => siteBackup(name))
  },
  siteSsl(e) {
    const name = e.msg.match(commands[4].reg)[1]
    return replyHandle(e, '网站SSL', () => getSiteSsl(name))
  },
}
