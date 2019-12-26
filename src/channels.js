export const warning = guild => guild.channels.find(channel => channel.name === 'ostrzeżenie')

export const hard = guild => guild.channels.find(channel => channel.name === 'hard')

export const general = guild => guild.channels.find(channel => channel.name === 'ogólny')
