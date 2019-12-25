export function warning (guild) {
  return guild.channels.find(channel => channel.name === 'ostrzeżenie')
}

export function hard (guild) {
  return guild.channels.find(channel => channel.name === 'hard')
}

export function general (guild) {
  return guild.channels.find(channel => channel.name === 'ogólny')
}
