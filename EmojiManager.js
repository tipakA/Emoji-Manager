/* eslint-disable global-require, no-empty-function, no-param-reassign */
const exec = require('util').promisify(require('child_process').exec);
const { Client } = require('discord.js');
const client = new Client();
const { token, prefix, owner } = require('./config.js');
let data = require('./messageIDs.js');

const reloadData = () => {
  try {
    const mod = require.cache[require.resolve('./messageIDs.js')];
    delete require.cache[require.resolve('./messageIDs.js')];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    data = require('./messageIDs.js');
  } catch (err) {
    return err;
  }
  return false;
};

const clear = async input => {
  if (input && input.constructor.name === 'Promise') input = await input;
  if (typeof evaled !== 'string') input = require('util').inspect(input, { depth: 1 });

  const output = input
    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
    .replace(/@/g, `@${String.fromCharCode(8203)}`)
    .replace(client.token, '👌');
  return output;
};

client.on('ready', () => console.log(`Me be ${client.user.tag}`));

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'ping') {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    const d = Date.now();
    const tmp = await message.channel.send('...');
    return tmp.edit(`\`${d - message.createdTimestamp}\` / \`${client.ws.ping}\``);
  } else if (cmd === 'reboot') {
    if (message.author.id !== owner) return;
    await exec('pm2 restart EmojiManager');
    return process.exit(0);
  } else if (cmd === 'reload') {
    if (message.author.id !== owner) return;
    const reload = await reloadData();
    if (!reload) return message.react('✅').catch(() => {});
    else {
      try {
        message.react('❌');
        message.channel.send(`ERROR\n${reload}`);
      } catch (err) { console.error(err); }
    }
  } else if (cmd === 'eval') {
    const code = args.join(' ');
    try {
      const evaled = eval(code);
      const clean = await clear(evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``, { split: true });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``, { split: true });
    }
  }
});

client.on('error', console.error);

client.login(token).catch(err => console.log('Error on login:', err));