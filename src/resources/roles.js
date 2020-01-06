import { hardParty } from './guilds'
// eslint-disable-next-line no-unused-vars
import { Role } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Rola "hard".
 * @return {Role}
 */
export const hard = () => hardParty().roles.find(role => role.name === 'hard')

// noinspection JSValidateTypes
/**
 * Rola "admin".
 * @return {Role}
 */
export const admin = () => hardParty().roles.find(role => role.name === 'admin')
