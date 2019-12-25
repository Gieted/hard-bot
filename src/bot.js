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

  members.admin(hardParty).dmChannel.send('Uruchomiono bota')
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
  const channel = message.channel

  if (message.channel instanceof TextChannel) {
    if (channel === channels.hard(message.guild)) {
      addVideoControls(message)
    }
  }

  if (message.channel instanceof DMChannel) {
    if (message.channel === members.admin(guild).user.dmChannel) {
      handleAdminMessage(guild, message)
    }
  }
})

export async function addVideoControls (message) {
  for (const button of emojis.videoButtons) {
    await message.react(button)
  }
}

start()
