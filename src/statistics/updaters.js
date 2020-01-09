import * as channels from './channels'
import * as channelNames from './channelNames'
import * as data from './data'

/**
 * Odświeża liczbę członków.
 */
export const updateMemberCount = () => {
  channels.memberCount().setName(channelNames.memberCount(data.memberCount()))
}

/**
 * Odświeża ilość filmów.
 */
export const updateVideoCount = () => {
  channels.videoCount().setName(channelNames.videoCount(data.videoCount()))
}

/**
 * Odświeża wszystkie statystyki.
 */
export const updateStatistics = () => {
  updateMemberCount()
  updateVideoCount()
}
