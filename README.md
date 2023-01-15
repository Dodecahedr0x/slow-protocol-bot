# Slow Protocol Bot

This is a Node.js bot for [Slow Protocol](https://www.slowprotocol.com/)

## How to use it

### Requirements

- Install Node.js
- `yarn install`
- Create a `key.json` file at the root of the project (e.g. using `solana-keygen new -o key.json`)
- Set the RPC provider in the file [src/constants.ts](./src/constants.ts)

### Mint

This function runs an infinite loop that calls the mint function of the Slow Protocol. See the official documentation to know what this exactly does...

Start by running `yarn mint`