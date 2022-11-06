import Web3 from "web3";

import { ABI, CONTRACT_ADDRESS } from "../data/Config";

const web3 = new Web3(typeof window !== "undefined" && (Web3.givenProvider || window.ethereum));

export const CrediContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
