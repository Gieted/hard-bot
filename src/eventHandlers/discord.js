import * as channels from '../resources/channels'
import { hardParty } from '../resources/guilds'
import * as members from '../resources/members'

import { handleAdminMessage } from '../adminCommands'
import { handleWarningAccept } from './other'
import { validateVideo } from '../util/videoUtil'

import { DMChannel, TextChannel } from 'discord.js'

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
  if (message.author.bot) return

  const channel = message.channel

  if (message.channel instanceof TextChannel) {
    if (channel === channels.hard()) {
      validateVideo(message)
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
