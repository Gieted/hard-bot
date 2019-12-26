import continueWatchingMessage from './continue-watching-message'
import * as channels from './channels'
import { db } from './bot'

export async function createMyZone (member) {
  const guild = member.guild
  const hardChannel = channels.hard(guild)

  const category = await guild.createChannel('Moja Strefa',
    { type: 'category', permissionOverwrites: [{ id: member, allow: 'READ_MESSAGES' }] })

  const continueWatchingChannel = await guild.createChannel('kontynuuj-oglądanie', { type: 'text', parent: category })
  const messages = await hardChannel.fetchMessages({ limit: 1 })
  const lastVideo = messages.first()
  continueWatchingChannel.send(continueWatchingMessage(lastVideo.url))

  db.collection('users').doc(member.user.id).set({
    continueWatchingChannelId: continueWatchingChannel.id,
    nextVideoId: lastVideo.id,
    watchedVideos: []
  })
}
