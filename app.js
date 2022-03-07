const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix, addys, whales} = require('./config/config');
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

    if(userCmd == commands.listWhales) {
        let whaleList = "Curent avaliable whales: "
        for (let [key, value] of Object.entries(whales)) {
            whaleList = whaleList + `${value}, `
        }

        msg.reply(whaleList);
    } else if (userCmd === commands.whale && useAddress && userArg.length > 0) {
        const reply = await getLastMsgs(address, "");
        msg.channel.send({ embeds: reply })
    } else if (userCmd == commands.whale && userArg in whales) {
        var addy = addys[userArg]
        console.log(addy)
        const reply = await getLastMsgs(addy, userArg);
        msg.channel.send({ embeds: reply })
    } else {
        console.log('invalid input')
        msg.reply('Thats not a command, try again');
    }
});

const getLastMsgs = async (wallet, whale) => {
    let url = `https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=100`
   
    let getRequest = fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        return response.json()
    })  .catch(err => { console.log(err); });

        let meResponse = await getRequest

     let last15 = meResponse.filter(action => action.buyer == wallet && (action.type == 'buy' || action.type == 'buyNow'))
        .slice(0, 10);

    console.log(last15)

      const embeds = [];

      last15.forEach((purchase, index) => {
        let purchaseTime = new Date(purchase.blockTime).toString()
        let collection = purchase.collection.replace("_", " ") 
        
        let title = wallet
        if(whale.length > 0) { 
            title = whale 
        }

        const embed = new MessageEmbed()
          .setColor('#00FFA3')
          .setURL(`https://solscan.io/tx/${purchase.signature}`)
          .setTitle(title) 
          .setFooter(purchaseTime)
          .setDescription(`${collection} for ${purchase.price} SOL`);

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
