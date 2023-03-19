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


# Installing the packages directly to the local nodeRED instance
# TODO - add error checking and proper feedback
echo "Installing the packages"
# npm install $ROOT_DIR/packages/node-eth-general 
npm install $ROOT_DIR/packages/node-eth-configuration 
npm install $ROOT_DIR/packages/node-eth-push 
echo "Done installing the packages"


# Start nodeRED once again
cd develop
cd nodered
npm start
echo $PWD


