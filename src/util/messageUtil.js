// eslint-disable-next-line no-unused-vars
import { Message } from 'discord.js'

/**
 * Pobiera pierwszą wiadomość z danego kanału.
 * @param channel - Kanał, z którego należy pobrać wiadomość.
 * @return {Promise<Message>} - Obietnica wiadomości.
 */
export const fetchFirstMessage = async channel => (await channel.messages.fetch({ limit: 1 })).first()

/**
 * Pobiera wszystkie wiadomości z danego kanału.
 * @param channel - Kanał, z którego należy pobrać wiadomości.
 * @return {Promise<Message[]>} - Obietnica listy wszystkich wiadomości.
 */
export const fetchAllMessages = async channel => {
  let allMessages = []
  let lastMessageId = null
  while (true) {
    const messages = await channel.messages.fetch({ limit: 100, before: lastMessageId })
    allMessages = allMessages.concat(messages.array())
    if (messages.size === 0) break
    lastMessageId = messages.last().id
  }

  return allMessages
}
