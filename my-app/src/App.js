import logo from './logo.svg';
import './App.css';
import {ethers} from "ethers"

import { getEthClient, connect, getContract } from './contract';


connect()

const ethereum = getEthClient()
const contract = getContract()

contract.on("ProductPayed", (status) => {
  console.log(status);
});

async function shipped() {
  try{
    await contract.shipped()
  } catch(err) {
    console.log("You are not the owner")
  }
  
}
async function delivered() {
  try{
    await contract.delivered()
  } catch(err) {
    console.log("You are not the owner")
  }
}

async function getStatusForOwner() {
  try{
    const res = await contract.getStatus()
    console.log(res)
  } catch(err) {
    console.log("You are not the owner")
  }
}

async function getStatusForCustomer() {
  try{
    await contract.Status({value: ethers.utils.parseEther("0.0002")})
    console.log("Waiting transaction completion...")
  } catch(err) {
    console.log("Transaction failed")
  }
}

// lorsque l'utilisateur change de portefeuille
ethereum.on('accountsChanged', async () => {
  connect();
})


function App() {
  return (
    <div className="App">
      <button onClick={getStatusForOwner}>
        Get status (Owner only)
      </button>

      <button onClick={getStatusForCustomer}>
        Get status (Customer only)
      </button>


      <button onClick={shipped}>
        Product shipped
      </button>


      <button onClick={delivered}>
        Product delivered
      </button>

    </div>
  );
}

export default App;
