import 'regenerator-runtime/runtime'
import { Client, DMChannel, TextChannel } from 'discord.js'
import * as config from './config'
import * as channels from './channels'
import * as roles from './roles'
import * as emojis from './emojis'
import * as members from './members'
import { handleAdminMessage } from './admin-commands'
import * as R from 'ramda'

const client = new Client()

async function start () {
  await client.login(config.token)

  const hardParty = client.guilds.find(guild => guild.id === config.guildId)
  client.on('messageReactionAdd', handleReactionAdd(hardParty))
  client.on('message', handleMessage(hardParty))
  channels.warning(hardParty).fetchMessages()

  members.admin(hardParty).send('Uruchomiono bota')
}

const handleReactionAdd = R.curry((guild, messageReaction, user) => {
  const channel = messageReaction.message.channel
  if (channel === channels.warning(guild)) {
    handleWarningAccept(guild.member(user))
  }
})

function handleWarningAccept (member) {
  member.addRole(roles.hard(member.guild))
}

const handleMessage = R.curry((guild, message) => {
  if (message.author.bot) return

  const channel = message.channel

  if (message.channel instanceof TextChannel) {
    if (channel === channels.hard(message.guild)) {
      if (validateVideo(message)) {
        addVideoControls(message)
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
