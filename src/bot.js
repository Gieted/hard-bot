import 'regenerator-runtime/runtime'
import { Client, DMChannel, TextChannel } from 'discord.js'
import * as config from './config'
import * as channels from './channels'
import * as roles from './roles'
import * as emojis from './emojis'
import * as members from './members'
import { fetchAllMessages, handleAdminMessage, repairZones } from './admin-commands'
import * as R from 'ramda'
import admin from 'firebase-admin'
import continueWatchingMessage from './continue-watching-message'

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString())),
  databaseURL: 'https://hardbot-12.firebaseio.com'
})

export const db = admin.firestore()
const users = db.collection('users')

const client = new Client()

async function start () {
  await client.login(config.token)

  const hardParty = client.guilds.find(guild => guild.id === config.guildId)
  const videos = await fetchAllVideos(hardParty)
  client.on('messageReactionAdd', handleReactionAdd(hardParty, videos))
  client.on('messageReactionRemove', handleReactionRemove(hardParty, videos))
  client.on('message', handleMessage(hardParty, videos))
  channels.warning(hardParty).fetchMessages()

  members.admin(hardParty).send('Uruchomiono bota')
  repairZones(hardParty)
}

async function changeNextVideo (userId, guild, nextVideoUrl) {
  const user = (await users.doc(userId).get()).data()
  const channelId = user.continueWatchingChannelId
  const channel = guild.channels.find(channel => channel.id === channelId)
  const message = (await channel.fetchMessages({ limit: 1 })).first()
  message.edit(continueWatchingMessage(nextVideoUrl))
}

const handleReactionRemove = R.curry((guild, videos, messageReaction, user) => {
  const channel = messageReaction.message.channel
  if (channel === channels.hard(guild)) {
    handleButtonUnPress(videos, messageReaction, guild.member(user))
  }
})

function handleButtonUnPress (videos, messageReaction, member) {
  const message = messageReaction.message
  const userRef = users.doc(member.user.id)
  switch (messageReaction.emoji.toString()) {
    case emojis.like:
    case emojis.disLike:
      handleVideoUnRate(videos, message, userRef, member.user)
      break
  }
}

async function handleVideoUnRate (videos, message, userRef, user) {
  const userDoc = (await userRef.get()).data()
  let watchedVideos = userDoc.watchedVideos
  const reactions = message.reactions.filter(reaction => reaction.emoji.toString() === emojis.like ||
                                                         reaction.emoji.toString() === emojis.disLike)

  const promises = []
  for (const reaction of reactions.array()) {
    promises.push(reaction.fetchUsers())
  }

  const [users1, users2] = await Promise.all(promises)
  const users = users1.concat(users2)

  if (!users.some(user1 => user1 === user)) {
    watchedVideos = R.reject(R.equals(message.id), watchedVideos)
  }

  userDoc.watchedVideos = watchedVideos
  const firstNotWatchedVideo = findFirstNotWatchedVideo(videos, watchedVideos)
  userDoc.nextVideoId = firstNotWatchedVideo.id
  changeNextVideo(user.id, message.guild, firstNotWatchedVideo.url)
  userRef.set(userDoc)
}

function fetchAllVideos (guild) {
  return fetchAllMessages(channels.hard(guild))
}

const handleReactionAdd = R.curry((guild, videos, messageReaction, user) => {
  const channel = messageReaction.message.channel
  if (channel === channels.warning(guild)) {
    handleWarningAccept(guild.member(user))
  }

  if (channel === channels.hard(guild)) {
    handleButtonPress(videos, messageReaction, guild.member(user))
  }
})

function handleButtonPress (videos, messageReaction, member) {
  const message = messageReaction.message
  const userRef = users.doc(member.user.id)
  switch (messageReaction.emoji.toString()) {
    case emojis.like:
      handleLikeAdd(message, member.user)
      handleVideoRate(videos, message, userRef, member.user)
      break
    case emojis.disLike:
      handleDisLikeAdd(message, member.user)
      handleVideoRate(videos, message, userRef, member.user)
      break
  }
}

async function handleLikeAdd (message, user) {
  const disLike = message.reactions.find(reaction => reaction.emoji.toString() === emojis.disLike)
  const users = await disLike.fetchUsers(100)
  if (users.some(user1 => user1 === user)) disLike.remove(user)
}

async function handleDisLikeAdd (message, user) {
  const like = message.reactions.find(reaction => reaction.emoji.toString() === emojis.like)
  const users = await like.fetchUsers(100)
  if (users.some(user1 => user1 === user)) like.remove(user)
}

async function handleVideoRate (videos, message, userRef, user) {
  const userDoc = (await userRef.get()).data()
  const watchedVideos = userDoc.watchedVideos
  watchedVideos.push(message.id)
  userDoc.watchedVideos = watchedVideos
  if (message.id === userDoc.nextVideoId) {
    const firstNotWatchedVideo = findFirstNotWatchedVideo(videos, watchedVideos)
    userDoc.nextVideoId = firstNotWatchedVideo.id
    changeNextVideo(user.id, message.guild, firstNotWatchedVideo.url)
  }
  userRef.set(userDoc)
}

function findFirstNotWatchedVideo (videos, watchedVideos) {
  for (const video of videos) {
    if (watchedVideos.some(vid => vid === video.id)) continue
    return video
  }
}

function handleWarningAccept (member) {
  member.addRole(roles.hard(member.guild))
}

const handleMessage = R.curry((guild, videos, message) => {
  if (message.author.bot) return

  const channel = message.channel

  if (message.channel instanceof TextChannel) {
    if (channel === channels.hard(message.guild)) {
      if (validateVideo(message)) {
        addVideoControls(message)
        videos.push(message)
      }
    }
  }

  if (message.channel instanceof DMChannel) {
    if (message.author === members.admin(guild).user) {
      handleAdminMessage(guild, message)
    } else {
      message.channel.send('Hej, jeśli próbujesz skontaktować się z administracją, to w ten sposób ci się nie uda.' +
                           ' Pisz po prostu na #ogólny.')
    }
  }
})

export async function addVideoControls (message) {
  for (const button of emojis.videoButtons) {
    await message.react(button)
  }
}

function validateVideo (message) {
  if (message.content !== '') {
    message.delete()
    return false
  }

  if (message.attachments.size !== 1) {
    message.delete()
    return false
  }

  if (!message.attachments.first().filename.endsWith('.mp4')) {
    message.delete()
    return false
  }

  return true
}

start()
