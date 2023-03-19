#!/bin/bash

# Define the directory to watch
WATCH_DIR="."

# Define the file types to watch for
WATCH_FILES=( "*.js" "*.ts" "*.html" )

# Define the command to run when a change is detected
WATCH_COMMAND="echo 'Dummy command"

# Start the watcher
while true
do
  inotifywait -r -e modify,create,delete $WATCH_DIR "${WATCH_FILES[@]}" >/dev/null 2>&1
  eval $WATCH_COMMAND
done
