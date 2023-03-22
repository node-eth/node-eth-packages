#!/bin/bash

# Prune the local dev nodeRED installation


# Get the scripts directory location
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Set the color
Color_Off='\033[0m'
Yellow='\033[0;33m'

# Prompt the user with verification t
read -p "Are you sure? (Y/y if you are)" -n 1 -r
echo    # (optional) move to a new line
# Do dangerous stuff
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${Yellow}You said it chief! Pruning the directory...${Color_Off}"
    cd ..
    sudo rm -r develop/nodered/*
fi




