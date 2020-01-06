import * as channels from '../resources/channels'

import { fetchAllMessages } from './messageUtil'

/**
 * Sprawdza czy film spełnia zasady kanału hard, jeśli nie, usuwa go.
 * @param video - Film do sprawdzenia.
 * @return {boolean} - Fałsz jeśli film został usunięty, w przeciwnym wypadku prawda.
 */
export const validateVideo = video => {
  if (video.content !== '') {
    video.delete()
    return false
  }

  if (video.attachments.size !== 1) {
    video.delete()
    return false
  }

  if (!video.attachments.first().filename.endsWith('.mp4')) {
    video.delete()
    return false
  }

  return true
}

/**
 * Pobiera listę wszystkich filmów.
 */
export const fetchAllVideos = () => {
  fetchAllMessages(channels.hard())
}
