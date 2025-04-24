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
      '🎮・discussions',
      '🕹・annonces',
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

  console.log('Structure ARTEKON créée !');
  client.destroy();
});

client.login(process.env.TOKEN);
