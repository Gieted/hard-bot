export function hard (guild) {
  return guild.roles.find(role => role.name === 'hard')
}

export function admin (guild) {
  return guild.roles.find(role => role.name === 'admin')
}
