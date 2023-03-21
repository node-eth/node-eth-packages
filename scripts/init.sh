#!/bin/bash

# TODO - this script should configure your everythng
# from installation to starting whatever is necessary
# providing you with a clean installation of nodeRED

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ..

# Install the dependencies 
yarn install

# Create a clean nodeRED instance
cd develop
cd nodered
alternate-node-red-installer -f .

# Then run the rebuild script to auto install everything
sh ./rebuild.sh