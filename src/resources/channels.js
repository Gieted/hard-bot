import { hardParty } from './guilds'
// eslint-disable-next-line no-unused-vars
import { TextChannel } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Kanał "ostrzeżenie".
 * @return {TextChannel}
 */
export const warning = () => hardParty().channels.find(channel => channel.name === 'ostrzeżenie')

// noinspection JSValidateTypes
/**
 * Kanał "hard".
 * @return {TextChannel}
 */
export const hard = () => hardParty().channels.find(channel => channel.name === 'hard')

// noinspection JSValidateTypes
/**
 * Kanał "ogólny".
 * @return {TextChannel}
 */
export const general = () => hardParty().channels.find(channel => channel.name === 'ogólny')
