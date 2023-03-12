const { expect } = require("chai");

describe("Token contract", function () {
  it("Should check token creation and deletion with events emitting", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("Nft");
    const hardhatNft = await Nft.deploy();

    expect(await hardhatNft.createToken("token_0", new Uint8Array(0))).to.emit(hardhatNft, "TokenCreated").withArgs(0)
    expect(await hardhatNft.createToken("token_1", new Uint8Array(10))).to.emit(hardhatNft, "TokenCreated").withArgs(1)
    expect(await hardhatNft.deleteToken(0)).to.emit(hardhatNft, "TokenDeleted").withArgs(0)
  });

});