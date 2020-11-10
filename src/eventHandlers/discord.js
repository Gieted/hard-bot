import * as channels from '../resources/channels'
import { hardParty } from '../resources/guilds'
import * as members from '../resources/members'

import { handleAdminMessage } from '../adminCommands'
import { handleAccessGrant, handleAccessRemove, handleWarningAccept } from './other'
import { isValid } from '../util'

import { DMChannel, TextChannel } from 'discord.js'
import { updateMemberCount, updateVideoCount } from '../statistics/updaters'
import hasAccess from '../util/hasAccess'

/**
 * Wywoływana przy dodaniu reakcji do wiadomości.
 * @param messageReaction - Dodana reakcja.
 * @param user - Użytkownik, który dodał reakcję.
 */
export const handleReactionAdd = (messageReaction, user) => {
  const channel = messageReaction.message.channel
  if (channel === channels.warning()) {
    handleWarningAccept(hardParty().member(user))
  }
}

/**
 * Wywoływana przy otrzymaniu wiadomości, z jakiegokolwiek źródła.
 * @param message - Otrzymana wiadomość.
 */
export const handleMessage = message => {
  if (message.author.bot) {
    if (message.content === 'done') {
      message.delete().then(updateVideoCount)
    }
    return
  }

  const channel = message.channel

  if (message.channel instanceof TextChannel) {
    if (channel === channels.videos()) {
      if (!isValid(message)) {
        message.delete()
      } else {
        updateVideoCount()
      }
    }
  }

  if (message.channel instanceof DMChannel) {
    if (message.author === members.admin().user) {
      handleAdminMessage(message)
    } else {
      message.channel.send('Hej, jeśli próbujesz skontaktować się z administracją, to w ten sposób ci się nie uda.' +
        ' Pisz po prostu na #ogólny.')
    }
  }
}

/**
 * Wywoływana przy usunięciu wiadomości.
 * @param message - Usunięta wiadomość.
 */
export const handleMessageDelete = message => {
  const channel = message.channel

  if (channel instanceof TextChannel) {
    if (channel === channels.videos()) {
      updateVideoCount()
    }
  }
}

/**
 * Wywolywana przy usunięciu członka.
 * @param member - Usunięty członek.
 */
export const handleGuildMemberRemove = member => {
  if (member.guild === hardParty()) {
    updateMemberCount()
  }
}

/**
 * Wywoływana przy zaktualizowaniu członka.
 * @param oldMember - Członek przed aktualizacją.
 * @param newMember - Członek po aktualizacji.
 */
export const handleGuildMemberUpdate = (oldMember, newMember) => {
  if (!hasAccess(oldMember) && hasAccess(newMember)) {
    handleAccessGrant()
  } else if (hasAccess(oldMember) && !hasAccess(newMember)) {
    handleAccessRemove()
  }
}
