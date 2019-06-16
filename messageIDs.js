/* eslint-disable no-inline-comments, sort-keys */
const { Collection } = require('discord.js');
const listChannel = '521760634627555367';

module.exports.emojiGuilds = new Collection([
  [ // JoJ
    '334499698075238401', {
      emojiGuild: {
        channel: '521760634627555367',
        animated: '587883113737224218',
        notAnimated: '587883191415734272',
        stats: '587916041355657227',
        latest: '587916042156769282',
      },
      listGuild: {
        animated: undefined,
        notAnimated: undefined,
      },
    },
  ],
  [ // AC
    '493479164834480128', {
      emojiGuild: {
        channel: '521780270320320513',
        animated: '557958925195018251',
        notAnimated: '557959009647329282',
        stats: '587915989807792148',
        latest: '587915990541533184',
      },
      listGuild: {
        channel: listChannel,
        animated: '589639875138158619',
        notAnimated: '589639875859447810',
      },
    },
  ],
  [ // 1xd
    '493745970207522816', {
      emojiGuild: {
        channel: '557958371249094676',
        animated: '557958575444590608',
        notAnimated: '557958681602555905',
        stats: '587915932127592458',
        latest: '587915932911927336',
      },
      listGuild: {
        channel: listChannel,
        animated: '589639894708649985',
        notAnimated: '589639895824203776',
      },
    },
  ],
  [ // 2xd
    '503314727724646432', {
      emojiGuild: {
        channel: '545069138272452609',
        animated: '557958167602921481',
        notAnimated: '557958253347340298',
        stats: '587915898401193984',
        latest: '587915899491713034',
      },
      listGuild: {
        channel: listChannel,
        animated: '589639928175132682',
        notAnimated: '589639929017925648',
      },
    },
  ],
  [ // 3xd
    '503314903835213824', {
      emojiGuild: {
        channel: '543784874809753623',
        animated: undefined,
        notAnimated: '557958071025008640',
        stats: undefined,
        latest: undefined,
      },
      listGuild: {
        channel: listChannel,
        animated: '589639960290656257',
        notAnimated: '589639961243025408',
      },
    },
  ],
  [ // 4xd
    '512975804318089226', {
      emojiGuild: {
        channel: '545068876778438657',
        animated: '557957865009053742',
        notAnimated: '557957950099161099',
        stats: '587915819183243269',
        latest: '587915820332613652',
      },
      listGuild: {
        channel: listChannel,
        animated: '589640016024829952',
        notAnimated: '589640016846651414',
      },
    },
  ],
  [ // 5xd
    '523134778778845184', {
      emojiGuild: {
        channel: '544013636944003110',
        animated: '557957720821727232',
        notAnimated: '587915748676993026',
        stats: '587915750128484352',
        latest: '587915751365804053',
      },
      listGuild: {
        channel: listChannel,
        animated: '589640085725642881',
        notAnimated: '589640087000711209',
      },
    },
  ],
]);

module.exports.mainList = new Collection([
  [
    '493479164834480128', { // AC
      animated: '589639875138158619',
      notAnimated: '589639875859447810',
    },
  ],
  [
    '493745970207522816', { // 1xd
      animated: '589639894708649985',
      notAnimated: '589639895824203776',
    },
  ],
  [
    '503314727724646432', { // 2xd
      animated: '589639928175132682',
      notAnimated: '589639929017925648',
    },
  ],
  [
    '503314903835213824', { // 3xd
      animated: '589639960290656257',
      notAnimated: '589639961243025408',
    },
  ],
  [
    '512975804318089226', { // 4xd
      animated: '589640016024829952',
      notAnimated: '589640016846651414',
    },
  ],
  [
    '523134778778845184', { // 5xd
      animated: '589640085725642881',
      notAnimated: '589640087000711209',
    },
  ],
]);