const { ethers } = require("ethers");
const abi = require("./Marketplace.json")

export async function connect() {
    // On récupère le client Metamask
    const _ethereum = getEthClient();
    try {
        if (_ethereum) {
            // Envoie une requête de connexion du portefeuille
            const accounts = await _ethereum.request({ method: "eth_requestAccounts" });

            return accounts[0]
        } 
    } catch (err) {
        console.log(err);
    }
    return null;
}

export function getEthClient(){
    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("MetaMask not installed !");
            return null;
        }

        return ethereum;

    } catch (err) {
        console.log(err);
        return null;
    }
}


export function getContract() {
    let provider = new ethers.providers.Web3Provider(getEthClient(), "any");

    let contractAddress = "0x36E6628F25Dd8A3281a40Bc1951420B45D0845E8";
    let contractABI = abi.abi;
    let signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract
}





