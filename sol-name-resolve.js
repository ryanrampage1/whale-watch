const { getHashedName, getNameAccountKey, NameRegistryState } = require("@bonfida/spl-name-service");
const { PublicKey, Connection, clusterApiUrl } = require("@solana/web3.js");

const resolveDomain = async(domain) => {
    const hashedName = await getHashedName(domain.replace(".sol", ""));
    const nameAccountKey = await getNameAccountKey(
        hashedName,
        undefined,
        new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
    );
    const owner = NameRegistryState.retrieve(
        new Connection(clusterApiUrl("mainnet-beta")),
        nameAccountKey
    ).then(acct => {
        return acct.owner.toBase58()
    })
    .catch( err => {
        return `Could not resolve address ${domain}`
    });

    console.log(owner);

    return owner
}

module.exports = resolveDomain;
