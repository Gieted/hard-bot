import { fetchFirstMessage } from './messageUtil'
import * as channels from '../resources/channels'
import * as members from '../resources/members'

export const fetchWarningMessage = () => {
  fetchFirstMessage(channels.warning())
}

export const sendWelcomeMessage = () => members.admin().send('Uruchomiono bota')
