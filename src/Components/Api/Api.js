import Web3 from "web3";
import {abi,contractAddress,tokencontractAddress,tokenabi} from "../Constants/constant";
let accounts;

   const getAccounts = async () => {
    const web3 = window.web3;
    try {
        accounts = await web3.eth.getAccounts();
        return accounts;
    } catch (error) {
        console.log("Error while fetching acounts: ", error);
        return null;
    }
};
export const loadWeb3 = async () => {
    let isConnected = false;
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);

            await window.ethereum.enable();
            isConnected = true;
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
             isConnected = true;
        } else {
            isConnected = false;
            console.log("Metamask is not installed, please install it on your browser to connect.");
        }
        if (isConnected === true) {
            // contractOf = new window.web3.eth.Contract(abi, contract);
            let accounts = await getAccounts();
            let accountAd = accounts[0];
            return accountAd;
            // let acc = accountAd.substring(0, 4) + "..." + accountAd.substring(accountAd.length - 4)
            // console.log("My Account",acc)
            // setAddress(acc);
        }

    } catch (error) {
        console.log("Error while loding web3", error);
    }
}
