import * as roles from '../resources/roles'
import { updateMemberCount } from '../statistics/updaters'

/**
 * Wywoływana przy zaakceptowaniu ostrzeżenia.
 * @param member - Członek, który zaakceptował ostrzeżenie.
 */
export const handleWarningAccept = (member) => {
  member.roles.add(roles.access()).then(() => setTimeout(updateMemberCount, 500))
}
