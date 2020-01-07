import * as channels from './resources/channels'
import * as roles from './resources/roles'
import * as members from './resources/members'
// eslint-disable-next-line no-unused-vars
import { Message } from 'discord.js'

/**
 * Wywoływana przy wysłaniu wiadomości prywatnej przez admina.
 * @param {Message} message - Wiadomość wysłana przez admina.
 */
export const handleAdminMessage = message => {
  const [, command, body] = /(\S*)\s?(.*)/.exec(message.content)
  switch (command) {
    case 'msg':
      sendToGeneral(body)
      break
    case 'admin':
      switchAdmin()
      break
    default:
      message.channel.send('Nierozpoznano komendy.')
      break
  }
}

/**
 * Wysyła wiadomość na kanale "ogólny", jako bot.
 * @param content - Treść wiadomości.
 */
const sendToGeneral = content => {
  if (content === '') {
    return
  }

  channels.general().send(content)
}

/**
 * Dodaje lub usuwa rolę "admin" administratorowi serwera.
 */
const switchAdmin = () => {
  const member = members.admin()
  const adminRole = roles.admin()
  if (member.roles.some(role => role === adminRole)) {
    member.removeRole(adminRole)
  } else {
    member.addRole(adminRole)
  }
}
