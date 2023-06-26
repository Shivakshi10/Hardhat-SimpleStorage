//imports
const { ethers, run } = require("hardhat")

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract....")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const address = await simpleStorage.getAddress()
    console.log(`Deployed contract to: ${address}`)

    //verifying
    // if (process.env.ETHERSCAN_API_KEY) {
    //     await simpleStorage.deploymentTransaction.wait(6)
    //     await verify(address, [])
    // }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    //update this current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contactAddress, args) {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            address: contactAddress,
            constructorArguments: args,
        })
    } catch (err) {
        if (err.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(err)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(0)
    })
