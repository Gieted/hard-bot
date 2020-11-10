import * as config from './config'
import client from './client'
// eslint-disable-next-line no-unused-vars
import { Guild } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Gildia "Hard Party".
 * @return {Guild}
 */
export const hardParty = () => client.guilds.cache.find(guild => guild.id === config.guildId)
