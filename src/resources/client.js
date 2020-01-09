import { Client } from 'discord.js'

/**
 * Client discord.js.
 * @type {Client}
 */
export default new Client({ partials: ['MESSAGE'], messageCacheMaxSize: Infinity })
