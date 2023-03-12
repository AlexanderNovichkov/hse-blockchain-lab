pragma solidity ^0.8.0;


contract Nft{
    struct Token {
        uint64 id;
        address creator;
        address owner;
        string name;
        bytes data;
    }
    
     mapping(uint64 => Token) public tokens;
     uint64 private nextTokenId =  0;

    constructor() { }

    event TokenCreated(uint64 id);
    event TokenDeleted(uint64 id);

    function createToken(string memory name, bytes memory data) public {
        Token memory token  = Token(nextTokenId, msg.sender, msg.sender, name, data);
        nextTokenId++;
        tokens[token.id] = token;
        emit TokenCreated(token.id);
    }

    function deleteToken(uint64 id) public {
        require (tokens[id].owner == msg.sender, "token can be deleted only by its owner");
        delete tokens[id];
        emit TokenDeleted(id);
    }
}