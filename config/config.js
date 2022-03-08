const { Intents } = require('discord.js');

const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];

const commands = {
  whale: 'whale',
  address: 'address',
  listWhales: "list-whales",
  resolve: "resolve"
};

const whales = {
  cozy: 'cozy',
  knox: 'knox',
  bigBrain: 'bigBrain',
  solHub: 'solHub',
  ravers: 'ravers',
  nine: "nine",
  hfp: "hfp",
  bustos: "bustos",
  jords: "jords",
  spoon: "spoon"
};

const addys = {
  cozy: 'EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E',
  knox: 'DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo',
  bigBrain: '7iaZ47A6FmvCXJysMAaJYRNkVutksYBZEANFGSpDYhpN',
  solHub: 'DQ977NcueXqkDwTKjP5nsgmSgmsqstRo2XxGK2aHHKPr',
  ravers: 'GozLuKr4uvXM5k4z5KrMdQbBBkRMh3sVBgDPXtrWd7xX',
  nine: "HGEj9nJHdAWJKMHGGHRnhvb3i1XakELSRTn5B4otmAhU",
  hfp: "HFPaT6WKk9SkwtYVZ5m5Sqw7ZbyehGu9GHjsctigm49S",
  bustos: "Er6QJPusC1JsUqevTjFKXtYHbgCtJkyo1DNjEBWevWut",
  jords: "8rvxqWArGREzNKxWXYFoAHDJDxMSiwTfQ7R4NWi5Ynbi",
  spoon: "5PTTb8TBgRFPPg4T2TFnf2og6trXAygWYE1RPFiZPZ1h"
};

const prefix = '!';

module.exports = { botIntents, prefix, commands, addys, whales };