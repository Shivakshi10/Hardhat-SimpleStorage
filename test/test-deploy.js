const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simepleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        simepleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simepleStorageFactory.deploy()
    })

    it("Should start with a favorite numbrt of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
        //alternate to assert : expect : syntax ::: expect(currentValue.toString().to.equal(expectedValue))
    })
    it("Should update to call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
