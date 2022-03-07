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
    if (!msg.content.startsWith(prefix)) return; // do nothing if prefix isn't used

    const userInput = msg.content.slice(prefix.length);
    const userCmd = userInput.split(' ')[0]
    const userArg = userInput.split(' ')[1]

    console.log('message:' + msg.content + 'cmd:' + userCmd + ', args:' + userArg)

    if (userCmd === commands.last5 && userArg.length > 0) {
        msg.reply("Loading last 5 ME purchases for wallet " + userArg);
        const reply = await getLastMsgs(userArg);
        // console.log(reply)

        msg.channel.send({ embeds: reply })
    } else {
        msg.reply('I do not understand your command');
    }

    //   else if (userCmd === commands.lastMsgs) {
    //     const reply = await getLastMsgs(msg);
    //     msg.author.send({ embeds: reply });
    //   }
});

const getLastMsgs = async (wallet) => {
    // fetching the last 10 messages
    //   const res = await msg.channel.messages.fetch({ limit: 10 });
    let url = "https://api-mainnet.magiceden.dev/v2/wallets/" + wallet + "/activities?offset=0&limit=100"
   
    let getRequest = fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        return response.json()
    })  .catch(err => { console.log(err); });

        let meResponse = await getRequest

     let last5 = meResponse.filter(action => action.buyer == wallet && (action.type == 'buy' || action.type == 'buyNow'))
        .slice(0, 5);
        
    //   const lastTenMsgs = res.map((message) => {
    //     return message.content;
    //   });

            console.log(last5)

      const embeds = [];

      last5.forEach((purchase, index) => {
        const embed = new MessageEmbed()
          .setColor('#00FFA3') // can be hex like #3caf50
          .setTitle(purchase.collection)
          .setDescription(`${purchase.price} SOL`);

        embeds.push(embed);
      }
      );

      return embeds;
};

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag + "\n\n\n");
    //   const Guilds = client.guilds.cache.map(guild => guild.id);
    //     Guilds.forEach(element => {
    //         element.channels.get('general').send('testing bro')
    //       });
});

const startBot = () => {
    var key = process.env.api_key;
    client.login(key);
};

module.exports = startBot;
