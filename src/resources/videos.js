import * as channels from './channels'

/**
 * Lista wszystkich filmów.
 * @return {Message[]}
 */
export default () => channels.hard().messages.array()
