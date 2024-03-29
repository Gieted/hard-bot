import { hardParty } from '../resources/guilds'
import videos from '../resources/videos'
import * as roles from '../resources/roles'

/**
 * Liczba członków gildii.
 * @return {number}
 */
export const memberCount = () => hardParty()
  .members.cache.filter(member => member.roles.cache.some(role => role === roles.access())).size

/**
 * Ilość filmików.
 * @return {number}
 */
export const videoCount = () => videos().length
