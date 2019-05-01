pragma solidity 0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/*


              _    _                             
             | |  | |                            
  _ __  _   _| | _| | ____ _ _ __ ___   _____  __
 | '_ \| | | | |/ / |/ / _` | '_ ` _ \ / _ \ \/ /
 | |_) | |_| |   <|   < (_| | | | | | |  __/>  < 
 | .__/ \__,_|_|\_\_|\_\__,_|_| |_| |_|\___/_/\_\
 | |                                             
 |_|                                             

@title pukkamex Token Contract
For more information about this token sale, please visit https://pukkamex.com
@author Laith Alghoul - <l.alghoul@pukkamex.com>

*/

contract Pukkamex is  ERC20, ERC20Detailed, ERC20Pausable {

    constructor (string memory name, string memory symbol, uint8 decimals, uint256 totalSupply)
    ERC20Detailed(name, symbol, decimals)

    public {
        _mint(msg.sender, totalSupply);
    }

    function burn(uint256 value) public {
        _burn(msg.sender, value);
    }


}