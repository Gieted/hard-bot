import 'regenerator-runtime/runtime'

import client from './resources/client'
import * as config from './resources/config'

import { handleMessage, handleReactionAdd } from './eventHandlers'
import { fetchAllVideos, fetchWarningMessage, sendWelcomeMessage } from './util'

/**
 * Główna funckja rozruchowa bota.
 * @return {Promise<void>}
 */
const start = async () => {
  await client.login(config.token)
  registerListeners()
  fetchWarningMessage()
  fetchAllVideos()

  sendWelcomeMessage()
}

/**
 * Rejestruje listenery dla eventów discord.js.
 */
const registerListeners = () => {
  client.on('message', handleMessage)
  client.on('messageReactionAdd', handleReactionAdd)
}

start()
