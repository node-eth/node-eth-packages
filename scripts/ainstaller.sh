#!/bin/bash

# This script downloads the alternate NodeRED installer
# 
# There were some networking issues with NodeRED docker instances (You don't say!!!).
# Using the alternate nodeRED installer will allow you to directly interfere with the filesystem
# and will create clean NodeRED installations for your dev environment.
#
# We will also provide the scripts to fully controll the installation
#
#
#
# Ref to the repo and many thanks!!
# https://github.com/TotallyInformation/alternate-node-red-installer

npm install -g alternate-node-red-installer

# Now, from any command line, you should be able to run the following:
#
# alternate-node-red-installer -f <root folder name>
#
#
# Instead of the long-winded executable name, you can also use nrinstall
#
# nrinstall -f ~/nrtest