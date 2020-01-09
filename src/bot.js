import 'regenerator-runtime/runtime'

import client from './resources/client'
import * as config from './resources/config'

import { handleGuildMemberAddOrRemove, handleMessage, handleMessageDelete, handleReactionAdd } from './eventHandlers'
import { fetchAllVideos, fetchWarningMessage, sendWelcomeMessage } from './util'
import { updateStatistics } from './statistics/updaters'

/**
 * Główna funckja rozruchowa bota.
 * @return {Promise<void>}
 */
const start = async () => {
  await client.login(config.token)
  registerListeners()
  fetchWarningMessage()
  fetchAllVideos().then(updateStatistics)

  sendWelcomeMessage()
}

/**
 * Rejestruje listenery dla eventów discord.js.
 */
const registerListeners = () => {
  client.on('message', handleMessage)
  client.on('messageReactionAdd', handleReactionAdd)
  client.on('messageDelete', handleMessageDelete)
  client.on('guildMemberAdd', handleGuildMemberAddOrRemove)
  client.on('guildMemberRemove', handleGuildMemberAddOrRemove)
}

start()
