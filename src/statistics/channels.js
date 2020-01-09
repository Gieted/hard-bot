import { hardParty } from '../resources/guilds'
// eslint-disable-next-line no-unused-vars
import { VoiceChannel } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Kanał wyświetlający liczbę członków.
 * @return {VoiceChannel}
 */
export const memberCount = () => hardParty().channels.find(channel => channel.name.includes('członków'))

// noinspection JSValidateTypes
/**
 * Kanał wyświetlający liczbę filmów.
 * @return {VoiceChannel}
 */
export const videoCount = () => hardParty().channels.find(channel => channel.name.includes('filmów'))
