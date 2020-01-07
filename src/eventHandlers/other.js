import * as roles from '../resources/roles'

/**
 * Wywoływana przy zaakceptowaniu ostrzeżenia.
 * @param member - Członek, który zaakceptował ostrzeżenie.
 */
export const handleWarningAccept = (member) => {
  member.addRole(roles.access())
}
