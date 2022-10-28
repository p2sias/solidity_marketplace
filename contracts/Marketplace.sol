pragma solidity ^0.8.0

contract Marketplace {

    enum ShippingStatus {
        pending,
        shipped
    }

    ShippingStatus public shippingStatus;


}