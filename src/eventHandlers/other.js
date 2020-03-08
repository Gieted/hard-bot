import * as roles from '../resources/roles'
import { updateMemberCount } from '../statistics/updaters'

/**
 * Wywoływana przy zaakceptowaniu ostrzeżenia.
 * @param member - Członek, który zaakceptował ostrzeżenie.
 */
export const handleWarningAccept = (member) => {
  member.roles.add(roles.access())
}

/**
 * Wywoływana przy przyznaniu dostępu do serwera członkowi.
 */
export const handleAccessGrant = () => {
  updateMemberCount()
}

/**
 * Wywoływana przy odebraniu dostępu do serwera członkowi.
 */
export const handleAccessRemove = () => {
  updateMemberCount()
}
