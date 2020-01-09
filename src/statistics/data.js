import { hardParty } from '../resources/guilds'
import videos from '../resources/videos'

/**
 * Liczba członków gildii.
 * @return {number}
 */
export const memberCount = () => hardParty().members.filter(member => !member.user.bot).size

/**
 * Ilość filmików.
 * @return {number}
 */
export const videoCount = () => videos().length
