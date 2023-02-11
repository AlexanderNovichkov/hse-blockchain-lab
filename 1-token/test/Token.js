const { expect } = require("chai");

describe("Token contract", function () {
  it("Should check that default owner balance is zero, mint and burn tokens", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    expect(await hardhatToken.balanceOf(owner.address)).to.equal(0);
    expect(await hardhatToken.totalSupply()).to.equal(0);
    
    await hardhatToken.mint(owner.address, 100);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(100);
    expect(await hardhatToken.totalSupply()).to.equal(100);

    await hardhatToken.burn(owner.address, 30);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(70);
    expect(await hardhatToken.totalSupply()).to.equal(70);
  });


  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    await hardhatToken.mint(owner.address, 100);

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(0);
    expect(await hardhatToken.totalSupply()).to.equal(100);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    expect(await hardhatToken.totalSupply()).to.equal(100);
  });

});