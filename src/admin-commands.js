import * as channels from './channels'
import * as roles from './roles'
import * as emojis from './emojis'
import { addVideoControls } from './bot'

export function handleAdminMessage (guild, message) {
  const match = /(\S*)\s?(.*)/.exec(message)
  const [, command, body] = match
  const user = message.author
  switch (command) {
    case 'msg':
      msg(guild, body)
      break
    case 'admin':
      switchAdmin(guild, user)
      break
    case 'repair-controls':
      repairControls(guild)
      break
  }
}

function msg (guild, body) {
  if (body === '') {
    return
  }

  channels.general(guild).send(body)
}

function switchAdmin (guild, user) {
  const member = guild.member(user)
  const adminRole = roles.admin(guild)
  if (member.roles.some(role => role === adminRole)) {
    member.removeRole(adminRole)
  } else {
    member.addRole(adminRole)
  }
}

async function fetchAllMessages (channel) {
  let allMessages = []
  let lastMessageId = null
  while (true) {
    const messages = await channel.fetchMessages({ limit: 100, before: lastMessageId })
    allMessages = allMessages.concat(messages.array())
    if (messages.count !== 0) break
    lastMessageId = messages.last().id
  }

  return allMessages
}

async function repairControls (guild) {
  const hardChannel = channels.hard(guild)
  const messages = await fetchAllMessages(hardChannel)

  messages
    .filter(message => !(message.reactions.size === emojis.videoButtons.length &&
                         message.reactions.every(reaction => emojis.videoButtons.includes(reaction.emoji.toString()))))

    .forEach(async message => {
      await message.clearReactions()
      addVideoControls(message)
    })
}
