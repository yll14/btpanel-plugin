import { listDatabases, databaseBackup, getDatabaseStatus, getMysqlInfo } from './service.js'
import { checkMaster } from '../../function/auth.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#数据库列表$/, fnc: 'listDatabases', desc: '查看所有数据库' },
  { reg: /^#数据库状态$/, fnc: 'dbStatus', desc: '查看 MySQL 运行状态' },
  { reg: /^#MySQL配置$/, fnc: 'mysqlInfo', desc: '查看 MySQL 配置信息' },
  {
    reg: /^#数据库备份\s+(\S+)$/,
    fnc: 'backupDatabase',
    desc: '备份数据库，如 #数据库备份 test_db',
  },
]

export const DatabaseApp = {
  rules: commands,

  listDatabases(e) {
    return replyHandle(e, '数据库列表', () => listDatabases())
  },
  dbStatus(e) {
    return replyHandle(e, '数据库状态', () => getDatabaseStatus())
  },
  mysqlInfo(e) {
    return replyHandle(e, 'MySQL配置', () => getMysqlInfo())
  },
  backupDatabase(e) {
    if (!checkMaster(e)) return
    const name = e.msg.match(commands[3].reg)[1]
    return replyHandle(e, '数据库备份', () => databaseBackup(name))
  },
}
