const Token = artifacts.require("./contracts/Pukkamex.sol");
const BigNumber = web3.utils.BigNumber;

const toWei = web3.utils.toWei;

require("chai")
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("Token", async accounts => {
  let owner = accounts[0];
  let token;

  describe("total supply", function() {
    beforeEach(async function() {
      token = await Token.new("pukkamex", "PUX", 18, toWei("2500"), {
        from: owner
      });
    });
    it("returns the total amount of tokens", async function() {
      const total = await token.totalSupply.call();
      const balance = await token.balanceOf.call(owner);
      assert.equal(total.toString(), balance.toString());
    });

    it("should decrease from total supply after burning", async function() {
      const amount = toWei("10");
      const total = await token.totalSupply.call();

      await token.burn(amount, { from: owner });

      assert.equal(total.toString() - amount, await token.totalSupply.call());
    });

    it("should test token transfer", async function() {
      const amount = toWei("1");
      await token.transfer(accounts[1], amount);
      const balance = await token.balanceOf.call(accounts[1]);
      assert.equal(balance.toString(), amount.toString());
    });

    it("should pause token and check for correctness", async function() {
      await token.pause({ from: accounts[0] });
      const amount = toWei("1");
      try {
        await token.transfer(accounts[2], amount);
      } catch (error) {
        const invalidOpcode = error.message.search("revert") >= 0;
        assert(invalidOpcode, "Expected revert, got '" + error + "' instead");
      }
      let balance = await token.balanceOf.call(accounts[2]);
      assert.equal(balance.toString(), "0");
      await token.unpause({ from: accounts[0] });
      await token.transfer(accounts[2], amount);
      balance = await token.balanceOf.call(accounts[2]);
      assert.equal(balance.toString(), amount.toString());
    });
  });
});
