module.exports = function (RED) {
  const { ethers } = require("ethers")

  function ReadContractNode(config) {
    RED.nodes.createNode(this, config)

    // const node = this;

    this.contract = RED.nodes.getNode(config.contract)
    this.rpc = RED.nodes.getNode(config.rpc);
    // this.provider = RED.nodes.getNode(config.provider)
    this.readFrom = config.readFrom
    this.functionInputs = config.functionInputs;


    this.on('input', async function (msg, send) {
      this.status({})
      this.status({
        fill: "yellow",
        shape: "ring",
        text: "working on it...",
      });
      const contractAddress = this.contract.address
      // const network = this.provider.network
      // const apikey = this.provider.apikey
      const contractAbi = this.contract.abi
      const args = this.functionInputs.map((obj) => obj.value);
      // const providerApi = this.provider.provider  // To implement differnt API's down the road
      
      // Alchemy API key check
      // let provider = new ethers.AlchemyProvider(network)
      // if (apikey) {
      //   provider = new ethers.AlchemyProvider(network, apikey)
      // }

      // Get provider configuration of user's choice
      let provider = this.rpc.provider;

      // make contract
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      
      // read from contract function
      async function callContractFunction(contract, functionName, args) {
        try {
          if (typeof contract[functionName] === 'function') {
            const result = await contract[functionName](...args);
            return {output: result}
          } else {
            console.error(`Function '${functionName}' not found in the contract object`);
            this.status({
              fill: "red",
              shape: "ring",
              text: `Function not found in Contract`,
            });
          }
        } catch (error) {
          console.error('Error calling function:', error);
          this.status({
            fill: "red",
            shape: "ring",
            text: `Error Calling function`,
          });
        }
      }
      
      // read from contract and output result
      const payload = await callContractFunction(contract, this.readFrom, args);
      console.log(payload)
      // send(payload)
      msg.payload = payload;
      send(msg)
      this.status({
        fill: "green",
        shape: "ring",
        text: `Successful Contract invokation`,
      });
    });
  }
  RED.nodes.registerType("Read-Contract", ReadContractNode)
}
