const { Intents } = require('discord.js');

const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];

const commands = {
  whale: 'whale',
  address: 'address',
};

const whales = {
  cozy: 'cozy',
  knox: 'knox',
  bigBrain: 'bigbrain',
  solHub: 'solHub',
  ravers: 'ravers',
};

const addys = {
  cozy: 'EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E',
  knox: 'DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo',
  bigBrain: '7iaZ47A6FmvCXJysMAaJYRNkVutksYBZEANFGSpDYhpN',
  solHub: 'DQ977NcueXqkDwTKjP5nsgmSgmsqstRo2XxGK2aHHKPr',
  ravers: 'GozLuKr4uvXM5k4z5KrMdQbBBkRMh3sVBgDPXtrWd7xX'
};

const prefix = '!';

module.exports = { botIntents, prefix, commands, addys, whales };