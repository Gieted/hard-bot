import * as config from './config'

export function admin (guild) {
  return guild.members.find(member => member.user.id === config.adminId)
}
