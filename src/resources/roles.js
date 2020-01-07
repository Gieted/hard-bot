import { hardParty } from './guilds'
// eslint-disable-next-line no-unused-vars
import { Role } from 'discord.js'

// noinspection JSValidateTypes
/**
 * Rola "dostęp".
 * @return {Role}
 */
export const access = () => hardParty().roles.find(role => role.name === 'dostęp')

// noinspection JSValidateTypes
/**
 * Rola "admin".
 * @return {Role}
 */
export const admin = () => hardParty().roles.find(role => role.name === 'admin')
