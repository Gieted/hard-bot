import * as channels from './channels'

/**
 * Lista wszystkich filmów.
 * @return {Message[]}
 */
export default () => channels.videos().messages.cache.array()
