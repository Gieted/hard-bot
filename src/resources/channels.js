import { hardParty } from './guilds'
// eslint-disable-next-line no-unused-vars
import { TextChannel } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Kanał "ostrzeżenie".
 * @return {TextChannel}
 */
export const warning = () => hardParty().channels.cache.find(channel => channel.name === 'ostrzeżenie')

// noinspection JSValidateTypes
/**
 * Kanał "filmy".
 * @return {TextChannel}
 */
export const videos = () => hardParty().channels.cache.find(channel => channel.name === 'filmy')

// noinspection JSValidateTypes
/**
 * Kanał "ogólny".
 * @return {TextChannel}
 */
export const general = () => hardParty().channels.cache.find(channel => channel.name === 'ogólny')
