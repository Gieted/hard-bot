import * as channels from '../resources/channels'
import * as members from '../resources/members'

export const fetchWarningMessage = () => {
  channels.warning().messages.fetch()
}

export const sendWelcomeMessage = () => members.admin().send('Uruchomiono bota')
