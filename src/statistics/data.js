import { hardParty } from '../resources/guilds'
import * as channels from '../resources/channels'

/**
 * Liczba członków gildii.
 * @return {number}
 */
export const memberCount = () => hardParty().members.filter(member => !member.user.bot).size
/**
 * Ilość filmików.
 * @return {number}
 */
export const videoCount = () => channels.videos().messages.size
