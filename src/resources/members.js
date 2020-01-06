import * as config from './config'
import { hardParty } from './guilds'
// eslint-disable-next-line no-unused-vars
import { GuildMember } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Administrator serwera.
 * @return {GuildMember}
 */
export const admin = () => hardParty().members.find(member => member.user.id === config.adminId)
