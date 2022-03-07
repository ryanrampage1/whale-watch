const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix } = require('./config/config');
const config = require('./config/config');
const fetch = require('node-fetch');

const client = new Client({
    intents: botIntents,
    partials: ['CHANNEL', 'MESSAGE'],
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return; 

    const userInput = msg.content.slice(prefix.length);
    const userCmd = userInput.split(' ')[0]
    const userArg = userInput.split(' ')[1]
    const address = userInput.split(' ')[2]

    console.log('message:' + msg.content + 'cmd:' + userCmd + ', args:' + userArg)

    var useAddress = userArg == commands.address

    if (userCmd === commands.whale && useAddress && userArg.length > 0) {
        // Keepig this here, this is how to just reply in the channel to the person directly
        // msg.reply("Loading last 5 ME purchases for wallet " + userArg);
        const reply = await getLastMsgs(address);
        msg.channel.send({ embeds: reply })
    } else if (userCmd == commands.whale && userArg in whales) {
        var addy = adys.userArg
        const reply = await getLastMsgs(addy);
        msg.channel.send({ embeds: reply })
    } else {
        msg.reply('LOL try again');
    }

    //   else if (userCmd === commands.lastMsgs) {
    //     const reply = await getLastMsgs(msg);
    //     msg.author.send({ embeds: reply });
    //   }
});

const getLastMsgs = async (wallet) => {
    let url = `https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=100`
   
    let getRequest = fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        return response.json()
    })  .catch(err => { console.log(err); });

        let meResponse = await getRequest

     let last15 = meResponse.filter(action => action.buyer == wallet && (action.type == 'buy' || action.type == 'buyNow'))
        .slice(0, 15);

    console.log(last15)

      const embeds = [];

      last15.forEach((purchase, index) => {
        const embed = new MessageEmbed()
          .setColor('#00FFA3')
          .setTitle(purchase.collection)
          .setDescription(`${purchase.price} SOL`);

        embeds.push(embed);
      }
      );

      return embeds;
};

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag + "\n\n\n");
});

const startBot = () => {
    var key = process.env.api_key;
    client.login(key);
};

module.exports = startBot;
