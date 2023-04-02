#!/bin/bash

# Dev note* - This script is acting all strange with directory changes and all
# careful when using it

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )


# Hopefully these paths wont change
# TODO - think of a better solution later on
echo $SCRIPT_DIR
# For some reason this command takes you back 2 levels
# instead of 1
cd ..
cd node-eth-packages
ROOT_DIR=$PWD
cd /develop
cd /nodered


# Stop the NodeRED instace if its running
# (kill whatever is on the port 1880)
# https://stackoverflow.com/questions/9168392/shell-script-to-kill-the-process-listening-on-port-3000
echo "Stopping NodeRED on port 1880"
echo "Don't worry, browser will preserve your data"
pid=$(lsof -i:1880 -t); kill -TERM $pid || kill -KILL $pid

# Check if node-eth-general is already installed
if [ -d "node_modules/node-eth-general" ]; then
    echo "installing the packages"
    npm install $ROOT_DIR/packages/node-eth-general > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-configuration > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-push > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-ethereum > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-polygon > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-optimism > /dev/null 2>&1
    cd develop/nodered && npm install > /dev/null 2>&1
    echo "Done installing the packages"
else
    # Run npm install in the current directory + packages
    echo "installing the packages and nodered"
    npm install $ROOT_DIR/packages/node-eth-general > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-configuration > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-push > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-ethereum > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-polygon > /dev/null 2>&1
    npm install $ROOT_DIR/packages/node-eth-optimism > /dev/null 2>&1
    cd develop/nodedred && npm install > /dev/null 2>&1
    echo "Done installing the packages"
fi

# Wait for all background processes to finish
wait

# Start nodeRED once again
cd develop
cd nodered
npm start
echo $PWD