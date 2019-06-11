const exec = require('util').promisify(require('child_process').exec);
const { Client } = require('discord.js');
const client = new Client();
const { token, prefix, owner } = require('./config.js');

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const args = message.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'ping') {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    const d = Date.now();
    const tmp = await message.channel.send('...');
    return tmp.edit(`\`${message.createdTimestamp - d}\` / \`${client.ws.ping}\``);
  } else if (cmd === 'reboot') {
    if (message.author.id !== owner) return;
    await exec('pm2 restart EmojiManager');
    return process.exit(0);
  }
});

client.on('error', console.error);

client.login(token).catch(err => console.log('Error on login:', err));