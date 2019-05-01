const Pukkamex = artifacts.require("pukkamex.sol");

module.exports = function(deployer) {
  const _name = "pukkamex";
  const _symbol = "PUX";
  const _decimals = 18;

  let totalSupply = web3.utils.toBN(250000000);
  totalSupply = totalSupply.mul(web3.utils.toBN(10 ** _decimals));

  deployer.deploy(Pukkamex, _name, _symbol, _decimals, totalSupply);
};
