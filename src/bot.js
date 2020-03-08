import 'regenerator-runtime/runtime'

import client from './resources/client'
import * as config from './resources/config'

import {
  handleGuildMemberRemove,
  handleGuildMemberUpdate,
  handleMessage,
  handleMessageDelete,
  handleReactionAdd
} from './eventHandlers'
import { fetchAllVideos, fetchWarningMessage, sendWelcomeMessage } from './util'
import { updateStatistics } from './statistics/updaters'

/**
 * Główna funckja rozruchowa bota.
 * @return {Promise<void>}
 */
const start = () => {
  registerListeners()
  client.login(config.token)
}

/**
 * Inicjuje bota. Wywoływana po uruchomieniu bota.
 */
const init = () => {
  fetchWarningMessage()
  fetchAllVideos().then(updateStatistics)

  sendWelcomeMessage()
}

/**
 * Rejestruje listenery dla eventów discord.js.
 */
const registerListeners = () => {
  client.on('ready', init)
  client.on('message', handleMessage)
  client.on('messageReactionAdd', handleReactionAdd)
  client.on('messageDelete', handleMessageDelete)
  client.on('guildMemberRemove', handleGuildMemberRemove)
  client.on('guildMemberUpdate', handleGuildMemberUpdate)
}

start()
