// setup-artekon.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const structure = [
  {
    name: '🔰 ACCUEIL',
    channels: ['📌・règlement', '👋・bienvenue', '📢・annonces', '🆘・aide']
  },
  {
    name: '🧠 COMMUNAUTÉ',
    channels: ['💬・général', '📸・vos-setups', '🤣・memes', '🎧・musique', '🗳・suggestions']
  },
  {
    name: '🎮 GAMING',
    channels: [
      '🎮・jeux-du-moment',
      '🕹・vos-sessions',
      '📷・captures-ingame',
      { name: '🎙・vocal-gaming', type: 'GUILD_VOICE' }
    ]
  },
  {
    name: '💻 PROGRAMMATION',
    channels: ['💡・entraide-code', '🚧・projets-dev', '📚・ressources-dev', '🧪・showcase-code']
  },
  {
    name: '🎨 DESIGN & PIXEL ART',
    channels: ['🖌・vos-créations', '🧵・work-in-progress', '🧠・feedback-design', '📦・ressources-graphiques']
  },
  {
    name: '⚙️ BOTS & TECH',
    channels: ['🤖・commandes-bots', '🏅・classement-xp']
  },
  {
    name: '🔒 STAFF',
    channels: ['👀・log-modération', '🛠・gestion-serveur', '🎯・projets-interne']
  }
];

const roles = [
  { name: '🧙 Admin', color: 'Red', permissions: ['Administrator'] },
  { name: '👮 Modérateur', color: 'Blue', permissions: ['KickMembers', 'BanMembers', 'ManageMessages'] },
  { name: '💻 Codeur', color: 'Green' },
  { name: '🎨 Designer', color: 'Purple' },
  { name: '🕹 Gamer', color: 'Gold' },
  { name: '🎙 Vocal', color: 'Grey' },
  { name: '🚀 Membre', color: 'White' }
];

client.once('ready', async () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  const guild = client.guilds.cache.first();

  for (const section of structure) {
    const category = await guild.channels.create({
      name: section.name,
      type: 4 // CATEGORY
    });

    for (const ch of section.channels) {
      const isObj = typeof ch === 'object';
      await guild.channels.create({
        name: isObj ? ch.name : ch,
        type: isObj && ch.type === 'GUILD_VOICE' ? 2 : 0, // 2 = voice, 0 = text
        parent: category.id
      });
    }
  }

  for (const role of roles) {
    await guild.roles.create({
      name: role.name,
      color: role.color,
      permissions: role.permissions || []
    });
  }

  console.log('Structure ARTEKON et rôles créés !');
  client.destroy();
});

client.login(process.env.TOKEN);
