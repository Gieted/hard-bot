export async function createMyZone (member) {
  const guild = member.guild

  const category = await guild.createChannel('Moja Strefa',
    { type: 'category', permissionOverwrites: [{ id: member, allow: 'READ_MESSAGES' }] })

  guild.createChannel('kontynuuj-oglądanie', { type: 'text', parent: category })
}
