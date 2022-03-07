const { Intents } = require('discord.js');

const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];

const commands = {
  last5: 'last5',
  cozy: 'cozy',
  knox: 'knox',
  bigBrain: 'bigbrain',
  solHub: 'solHub'
};

const addys = {
  cozy: 'EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E',
  knox: 'DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo',
  bigBrain: '7iaZ47A6FmvCXJysMAaJYRNkVutksYBZEANFGSpDYhpN',
  solHub: 'DQ977NcueXqkDwTKjP5nsgmSgmsqstRo2XxGK2aHHKPr'
};

const prefix = '!';

module.exports = { botIntents, prefix, commands, addys };