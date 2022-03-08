const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands, prefix, addys, whales} = require('./config/config');
const config = require('./config/config');
const fetch = require('node-fetch');
const { getHashedName, getNameAccountKey, NameRegistryState, } = require("@bonfida/spl-name-service");
  
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

    if(userCmd == commands.resolve){
        msg.reply(await resolveDomain(userArg))
    } else if(userCmd == commands.listWhales) {
        sendWhales(msg)
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

const sendWhales = (msg) => {
    let whaleList = "Curent avaliable whales: "
    for (let [key, value] of Object.entries(whales)) {
        whaleList = whaleList + `${value}, `
    }

    msg.reply(whaleList);
}

const resolveDomain = async(domain) => {
    const hashedName = await getHashedName(domain.replace(".sol", ""));
    const nameAccountKey = await getNameAccountKey(
        hashedName,
        undefined,
        new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
    );
    const owner = await NameRegistryState.retrieve(
        new Connection(clusterApiUrl("mainnet-beta")),
        nameAccountKey
    );

    console.log(owner.owner.toBase58());
    return owner.owner.toBase58()
}

const getLastMsgs = async (wallet, whale) => {
    let url = `https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=100`
   
    let getRequest = fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        return response.json()
    })  .catch(err => { console.log(err); });

        let meResponse = await getRequest

     let last15 = meResponse.filter(action => (action.type == 'buy' || action.type == 'buyNow'))
        .slice(0, 10);

        // https://api-mainnet.magiceden.dev/v2/tokens/mint_address_here -- purchase.tokenMint
        // https://api-mainnet.magiceden.dev/v2/tokens/DSkG9nk7Ex8JMXhFW1Gi2RDdhCLh98KoFf3e3x9PZa37

    console.log(last15)

      const embeds = [];

      last15.forEach((purchase, index) => {
        let purchaseTime = new Date(purchase.blockTime *1000).toString().split(" (")[0]
        
        const replacer = new RegExp("_", 'g')
        let collection = purchase.collection.replace(replacer, " ") 
        
        let title = wallet
        if(whale.length > 0) { 
            title = whale 
        }

        let actionDone = "Bought"
        let color = "#00FFA3"
        if(purchase.seller == wallet){
            actionDone = "Sold"
            color = "#DC1FFF"
        }


        const embed = new MessageEmbed()
          .setColor(color)
          .setURL(`https://solscan.io/tx/${purchase.signature}`)
          .setTitle(`${actionDone} ${collection} -> ${purchase.price}◎`) 
          .setFooter(purchaseTime)
          .setDescription(`By ${title}`);

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
