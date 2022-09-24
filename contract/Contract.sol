// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DonationContract  {
    mapping(address => Donation) donations;
    struct Donation{
        address recipient;
        uint256 amount;
    }
    constructor(){

    }

    function addDonation(uint256 _amount , address _recipient) public returns (bool){
        require(_amount > 0 , "Amount is not correct");
        require(_recipient != address(0) , "Recipient is not correct");

        donations[msg.sender] = Donation(_recipient , _amount);
        return true;
    }
}