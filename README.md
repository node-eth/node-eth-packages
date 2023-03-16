# NodeETH Packages

This Monorepo contains everything to get you started on developing the NodeETH nodes, packages and contributions. \
( note - We disabled yarn's PnP option by adding `nodeLinker: node-modules` to the `./.yarnrc.yml`, [ref to the  thread](https://stackoverflow.com/questions/60012394/how-to-turn-off-yarn2-pnp) )

Directory structure:
```
.
+-- develop   (dedicated towards local nodeRED installations)
|   +-- nodered (root of the local nodeRED installation)
|       +-- bin, data, system, scripts, node_modules etc.
|       +-- README.md  - quite useful, check it out
|
+-- docker   (contains docker compose stack with nodeRED and hardhat)
|   +-- nodered-storage
|   +-- docker-compose.yml
|
+-- packages   (contains the packages being developed or used in development)
|   +-- hardhat
|   +-- node-eth-configuration
|   +-- node-eth-push-protocol
|
+-- scripts   (contains scripts related to the development process)
|
```

We recommend using the `./dev` directory to manage all your NodeRED installations related to this project.

## NodeRED local installation

Within the `./dev` directory, you will find a local installation of nodeRED