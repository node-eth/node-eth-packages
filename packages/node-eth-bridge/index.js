const { Hop } = require('@hop-protocol/sdk');
const { ethers } = require('ethers');

const main = async () => {
  // Replace with your Ethereum Goerli testnet private key
  const privateKey = '0xac79afa6f65d7362d6bd843af62c7af7b657009670e97db97ae1d428f410256a';
  const providerUrl = 'https://eth-goerli.g.alchemy.com/v2/lWjLf8hmkz3yFAl3KzY0pNPNKg4IkaSD';

  // Set up Ethereum Goerli provider and signer
  const goerliProvider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(privateKey, goerliProvider);

  // Instantiate the Hop SDK
  const hop = new Hop();

  // Set the source and destination networks
  const sourceNetwork = 'goerli';
  const destNetwork = 'kovan';

  // Set the token you'd like to bridge (e.g., USDC)
  const tokenSymbol = 'GoerliETH';

  // Set the amount you'd like to bridge (in smallest units, i.e., 1 USDC = 1e6)
  const amountToBridge = ethers.utils.parseUnits('1', 6);

  // Instantiate the bridge object
  const bridge = hop.bridge(tokenSymbol);

  // Get the Goerli L1 token contract
  const tokenContract = bridge.getL1TokenContract(sourceNetwork);

  // Approve the Hop Bridge to spend your tokens
  const approveTx = await tokenContract.connect(signer).approve(bridge.getL1BridgeAddress(sourceNetwork), amountToBridge);
  console.log('Waiting for token approval...');
  await approveTx.wait();
  console.log('Token approval confirmed.');

  // Perform the transfer from Goerli to Polygon Mumbai testnet
  const transferTx = await bridge.connect(signer).send(
    amountToBridge,
    sourceNetwork,
    destNetwork,
    {
      slippageTolerance: '0.5',
      deadline: Math.floor(Date.now() / 1000) + 60 * 15 // 15 minutes from now
    }
  );

  console.log('Waiting for bridging to complete...');
  await transferTx.wait();
  console.log('Bridging completed successfully!');
};

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
