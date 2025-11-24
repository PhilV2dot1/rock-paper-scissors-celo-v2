const hre = require("hardhat");

async function main() {
  console.log("Deploying RockPaperScissors contract...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "CELO");

  // Deploy the contract
  const RockPaperScissors = await hre.ethers.getContractFactory(
    "RockPaperScissors"
  );
  const contract = await RockPaperScissors.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("\n✅ Contract deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("\nNext steps:");
  console.log(
    "1. Update CONTRACT_ADDRESS in lib/contract-abi.ts with:",
    contractAddress
  );
  console.log("2. Verify the contract on Celoscan:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
  console.log("\nView on Celoscan:");

  if (hre.network.name === "celo") {
    console.log(`https://celoscan.io/address/${contractAddress}`);
  } else if (hre.network.name === "alfajores") {
    console.log(`https://alfajores.celoscan.io/address/${contractAddress}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
