import * as channels from './channels'
import * as roles from './roles'

export function handleAdminMessage (guild, message) {
  const match = /(\S*)\s?(.*)/.exec(message)
  const [, command, body] = match
  const user = message.author
  switch (command) {
    case 'msg':
      handleMsgCommand(guild, body)
      break
    case 'admin':
      handleAdminCommand(guild, user)
  }
}

function handleMsgCommand (guild, body) {
  if (body === '') {
    return
  }

  channels.general(guild).send(body)
}

function handleAdminCommand (guild, user) {
  const member = guild.member(user)
  const adminRole = roles.admin(guild)
  if (member.roles.some(role => role === adminRole)) {
    member.removeRole(adminRole)
  } else {
    member.addRole(adminRole)
  }
}
