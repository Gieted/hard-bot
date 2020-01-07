import * as channels from '../resources/channels'

import { fetchAllMessages } from './messageUtil'

/**
 * Sprawdza czy film spełnia zasady kanału hard.
 * @param video - Film do sprawdzenia.
 * @return {boolean} - Prawda jeśli film jest zgodny z zasadami, w przeciwnym wypadku fałsz.
 */
export const isValid = video => video.content === '' && video.attachments.size === 1 &&
                                video.attachments.first().filename.endsWith('.mp4')

/**
 * Pobiera listę wszystkich filmów.
 */
export const fetchAllVideos = () => {
  fetchAllMessages(channels.videos())
}
