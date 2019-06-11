/* eslint-disable global-require, no-empty-function, no-param-reassign */
const exec = require('util').promisify(require('child_process').exec);
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { token, prefix, owner } = require('./config.js');
let emojiData = require('./messageIDs.js');

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
    emojiData = require('./messageIDs.js');
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

const emojiList = input => {
  let output;
  if (input.animated) output = input.message.guild.emojis.filter(e => e.animated);
  else output = input.message.guild.emojis.filter(e => !e.animated);
  input.message.edit(output.map(e => e.toString()).join(', '));
};

const updateStats = async input => {
  const emojis = input.message.guild.emojis;
  const animatedCount = emojis.filter(e => e.animated).size;
  const notAnimatedCount = emojis.filter(e => !e.animated).size;
  const message = await input.message.channel.messages.fetch(input.emoji.stats);
  const statEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Emote slots left')
    .addField('Animated', `\`${50 - animatedCount}\`/\`50\``, true)
    .addField('Not Animated', `\`${50 - notAnimatedCount}\`/\`50\``, true);
  await message.edit('', { embed: statEmbed });
};

const makeEmbed = input => {
  const colors = {
    create: 'GREEN',
    delete: 'RED',
    update: 'YELLOW',
  };
  const embed = new MessageEmbed()
    .setColor(colors[input.type])
    .setTimestamp()
    .setAuthor(input.text);

  if (input.updated) {
    embed.addField('Emoji\'s name before update', input.e.name, true)
      .addField('Emoji after update', input.updated.toString(), true);
  } else if (input.deleted) {
    embed.addField('Removed emoji\'s name', input.e.name);
  } else {
    embed.addField('Emoji added', input.e.toString());
  }
  return embed;
};

const updateLatest = async input => { // { changed: { newEmoji, oldEmoji }, emoji, message, type: 'update' }
  const message = await input.message.channel.messages.fetch(input.emoji.latest);
  let text;
  let e;
  let updated = false;
  let deleted = false;
  if (input.type === 'update') {
    text = 'Emoji\'s name has changed';
    e = input.changed.oldEmoji;
    updated = input.changed.newEmoji;
  } else if (input.type === 'create') {
    text = 'Emoji has been added';
    e = input.changed.newEmoji;
  } else if (input.type === 'delete') {
    text = 'Emoji has beed deleted';
    e = input.changed.oldEmoji;
    deleted = true;
  } else return console.error('Invalid type in updateLatest');
  await message.edit('', { embed: makeEmbed({ deleted, e, text, type: input.type, updated }) });
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

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
  const emoji = emojiData.get(newEmoji.guild.id);
  if (!emoji) return;
  let type;
  if (newEmoji.animated) type = 'animated';
  else type = 'notAnimated';
  const message = await newEmoji.guild.channels.get(emoji.channel).messages.fetch(emoji[type]);
  if (!message) return console.error('Message does not exist');
  await updateLatest({ changed: { newEmoji, oldEmoji }, emoji, message, type: 'update' });
  return emojiList({ animated: newEmoji.animated, message });
});

client.on('emojiCreate', async newEmoji => {
  const emoji = emojiData.get(newEmoji.guild.id);
  if (!emoji) return;
  let type;
  if (newEmoji.animated) type = 'animated';
  else type = 'notAnimated';
  const message = await newEmoji.guild.channels.get(emoji.channel).messages.fetch(emoji[type]);
  if (!message) return console.error('Message does not exist');
  await updateStats({ emoji, message });
  await updateLatest({ changed: { newEmoji }, emoji, message, type: 'create' });
  return emojiList({ animated: newEmoji.animated, message });
});

client.on('emojiDelete', async oldEmoji => {
  const emoji = emojiData.get(oldEmoji.guild.id);
  if (!emoji) return;
  let type;
  if (oldEmoji.animated) type = 'animated';
  else type = 'notAnimated';
  const message = await oldEmoji.guild.channels.get(emoji.channel).messages.fetch(emoji[type]);
  if (!message) return console.error('Message does not exist');
  await updateStats({ emoji, message });
  await updateLatest({ changed: { oldEmoji }, emoji, message, type: 'delete' });
  return emojiList({ animated: oldEmoji.animated, message });
});

client.on('error', console.error);

client.login(token).catch(err => console.log('Error on login:', err));