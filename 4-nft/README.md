## Деплой смарт-контракта в сеть goerli
Нужно задать переменные окружения
* ALCHEMY_API_KEY
* GOERLI_PRIVATE_KEY
  
и выполнить команду:
```
npx hardhat run deployments/deployNft.js --network goerli
```
Пример stdout: 
```
Deploying contracts with the account: 0x068e2E1c9280241e46a616772d918dca39A3C6f4
Account balance: 449054089952491220
Nft address: 0xd4ABd6742004B7434D40E373caa08786dc221578
```
Смарк-контрак в goerli: https://goerli.etherscan.io/address/0xd4abd6742004b7434d40e373caa08786dc221578

## Клиент для взаимодействия со смарт-контрактом
Нужно задать переменные окружения
* ETHEREUM_NETWORK - например, ```goerli```
* SIGNER_PRIVATE_KEY - приватный ключ аккаунта ethereum
* INFURA_API_KEY
* CONTRACT_ADDRESS

Далее можно выполнить команды
```
node index.js create token_1 123
node index.js create token_2 456
node index.js delete 0
node index.js events TokenCreated
node index.js events AllEvents
```


