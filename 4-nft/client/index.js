const Web3 = require("web3");

const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("Nft.json"));

async function main() {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
    );
    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);

    const contract = new web3.eth.Contract(
        abi,
        process.env.CONTRACT_ADDRESS
    );

    command = process.argv[2]
    if (command == "create") {
        token_name = process.argv[3]
        token_data_as_number = process.argv[4]
        console.log("Creating token...");
        tx1 = contract.methods.createToken(token_name, new Uint8Array(token_data_as_number))
        tx1.send({ from: signer.address, gas: 2 * await tx1.estimateGas() })
            .on('receipt', function (receipt) {
                console.log("Token created");
                console.log(receipt);
            })
    } else if (command == "delete") {
        token_id = process.argv[3]
        console.log("Deleting token...");
        tx1 = contract.methods.deleteToken(token_id)
        tx1.send({ from: signer.address, gas: 2 * await tx1.estimateGas() })
            .on('receipt', function (receipt) {
                console.log("Token deleted");
                console.log(receipt);
            })
    } else if (command == "events") {
        event_name = process.argv[3]
        console.log("Events:");
        console.log(await contract.getPastEvents(event_name, { fromBlock: 0 }));
    } else {
        console.log("Unknown command")
    }
}

require("dotenv").config();
main();