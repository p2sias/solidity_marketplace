// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {

    enum ShippingStatus {
        pending,
        shipped,
        delivered
    }

    modifier onlyCustomer() {
        require(msg.sender != owner());
        _;
    }

    ShippingStatus status;
    
    event MissionComplete(ShippingStatus status, address seller);
    event ProductPayed(ShippingStatus status);

    constructor() {
        status = ShippingStatus.pending;
    }

    function shipped() public onlyOwner {
        status = ShippingStatus.shipped;
    }

    function delivered() public onlyOwner {
        status = ShippingStatus.delivered;
        emit MissionComplete(status, msg.sender);
    }

    function getStatus() public view onlyOwner returns(ShippingStatus) {
        return status;
    }

    function Status() public payable onlyCustomer {
        require(msg.value == 0.0002 ether, "Token amount must be 0.0002");
        emit ProductPayed(status);
    }
}