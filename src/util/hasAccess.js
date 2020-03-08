import { access } from '../resources/roles'

/**
 * Zwraca prawdę jeśli członek ma dostęp do serwera, w przeciwnym wypadku fałsz.
 * @param member - Członek, którego dostęp należy sprawdzić.
 * @return {boolean} - Pawda jeśli podany członek ma dostęp do serwera, w przeciwnym wypadku fałsz.
 */
export default member => member.roles.cache.some(role => role === access())
