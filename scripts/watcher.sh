#!/bin/bash

# is a useful one-liner which will give you the full directory
# name of the script no matter where it is being called from.
# https://stackoverflow.com/questions/59895/how-do-i-get-the-directory-where-a-bash-script-is-located-from-within-the-script
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# TODO - fix this once the timerush ends, make a better solution
cd $SCRIPT_DIR
cd .. 
nodemon