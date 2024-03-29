import * as channels from '../resources/channels'

import { fetchAllMessages } from './messageUtil'
// eslint-disable-next-line no-unused-vars
import { Message } from 'discord.js'

/**
 * Sprawdza czy film spełnia zasady kanału hard.
 * @param video - Film do sprawdzenia.
 * @return {boolean} - Prawda jeśli film jest zgodny z zasadami, w przeciwnym wypadku fałsz.
 */
export const isValid = video => video.content === '' && video.attachments.size === 1 &&
                                video.attachments.first().name.endsWith('.mp4')

/**
 * Pobiera listę wszystkich filmów.
 * @return {Promise<Message[]>}
 */
export const fetchAllVideos = () => {
  return fetchAllMessages(channels.videos())
}
